"use strict";
//==================================================
function recursiveCheck_Wrapper(originalFn, initTime) {
  const promiseCache = [];

  async function waitElemsAndExecute(...args) {
    [...args].forEach((elem) => {

      promiseCache.push(new Promise((resolve) => {

        let debounceTime = initTime;
        const recursiveCheck = () => {
          if (!elem) {
            debounceTime += 10;
            setTimeout(() => { recursiveCheck() }, debounceTime);
          } else {
            resolve(elem);
          }
        };
        recursiveCheck();

      }));
    });
    console.log(promiseCache);
    return Promise.all(promiseCache)
      .then((elements) => {
        return originalFn(...elements);
      })
  };

  return waitElemsAndExecute;
};
//==================================================
//==================================================
function lookForJourney(imsNumberMessage) {

    if (localStorage.getItem(imsNumberMessage?.innerHTML)) {
        const journey = JSON.parse(localStorage.getItem(imsNumberMessage?.innerHTML));
    
        function processRequestLink(reqNumberLink) {
            journey.reqNo = reqNumberLink?.children[0]?.innerHTML;

            localStorage.setItem(journey.reqNo, JSON.stringify(journey));
            localStorage.removeItem(imsNumberMessage?.innerHTML);
            reqNumberLink?.click();
        };
        processRequestLink = recursiveCheck_Wrapper(processRequestLink);
        processRequestLink( document.querySelector("#requesturl") );
    };
};
lookForJourney = recursiveCheck_Wrapper(lookForJourney);
lookForJourney( document.querySelector("#output_messages > div > div > div > a") );
