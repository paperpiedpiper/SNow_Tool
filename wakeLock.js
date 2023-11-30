"use strict";

let isWakeLockOn = false;
let wakeLockInstance = null;
let retry_timeoutHandle;

function checkAndRequestWakeLock() {
    if (!isWakeLockOn) {
        navigator.wakeLock.request('screen')
        .then((lock) => {
            isWakeLockOn = true;
            wakeLockInstance = lock;
            // console.log('Wake Lock is set.');
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible' && isWakeLockOn) {
                    checkAndRequestWakeLock();
                } else {
                    releaseWakeLock();
                };
            });
        })
        .catch(e => {
            retryRequest();
        });
    };
};

function releaseWakeLock() {
    if (wakeLockInstance !== null) {
        wakeLockInstance.release()
            .then(() => {
                // console.log('Wake Lock released.');
                isWakeLockOn = false;
                wakeLockInstance = null;
                retryRequest();
            })
            .catch(e => {
            });
    };
};

function retryRequest() {
    clearTimeout(retry_timeoutHandle);
    retry_timeoutHandle = setTimeout(() => {
        checkAndRequestWakeLock();
    }, 2500);
};

checkAndRequestWakeLock();