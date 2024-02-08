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
function lookForJourney(reqNumberField) {

    if (localStorage.getItem(reqNumberField?.value)) {
        const journey = JSON.parse(localStorage.getItem(reqNumberField?.value));

        function processRitmLink(ritmNumberLink) {
            journey.ritmNo = ritmNumberLink?.innerHTML;
    
            localStorage.setItem(journey.ritmNo, JSON.stringify(journey));
            localStorage.removeItem(journey.reqNo);
            ritmNumberLink?.click();

        };
        processRitmLink = recursiveAnchor_Wrap(processRitmLink, document.querySelector("#sc_request\\.sc_req_item\\.request_table > tbody")?.children[0]?.children[2]?.children[0]);
        processRitmLink();
    };
};
lookForJourney = recursiveCheck_Wrapper(lookForJourney);
lookForJourney( document.querySelector("#sys_readonly\\.sc_request\\.number") );