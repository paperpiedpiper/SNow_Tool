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
checkAndRequestWakeLock();

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

function checkAgentName() {
    if (localStorage.getItem('SNow_Agent_Name') && localStorage.getItem('SNow_Agent_Name') !== 'undefined') {
        return;
    };

    let triesLeft = 2;
    function setAgentName() {
        const agentName = document?.querySelector("body > macroponent-f51912f4c700201072b211d4d8c26010")?.shadowRoot?.querySelector("div > sn-canvas-appshell-root > sn-canvas-appshell-layout > sn-polaris-layout")?.shadowRoot.querySelector("div.sn-polaris-layout.polaris-enabled > div.layout-main > div.header-bar > sn-polaris-header")?.shadowRoot?.querySelector("#userMenu > span > span:nth-child(2) > div > div.user-menu-header.polaris-enabled > div > span > div")?.innerHTML;
        if (agentName) {
            localStorage.setItem('SNow_Agent_Name', agentName);
        } else if (triesLeft) {
            triesLeft--;
            setTimeout(setAgentName, 5000);
        }
    };
    setAgentName();
};
checkAgentName();