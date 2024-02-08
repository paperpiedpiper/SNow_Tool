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
function lookForJourney(ritmNumberField) {

    if (sessionStorage.getItem(ritmNumberField?.value)) {
        const journey = JSON.parse(sessionStorage.getItem(ritmNumberField?.value));

        function processDFields(shortDField) {
            const longDField = document.querySelector("#sc_task\\.description");

            if (shortDField && longDField) {
                if (!shortDField?.value || shortDField?.value == 'Generic Request')
                    shortDField.value = journey.shortD;
                
                if (!longDField?.value)
                    longDField.value = journey.longD;
            };
        };
        processDFields = recursiveCheck_Wrapper(processDFields);
        processDFields( document.querySelector("#sc_task\\.short_description") );
    };
};
lookForJourney = recursiveCheck_Wrapper(lookForJourney);
lookForJourney( document.querySelector("#sys_display\\.sc_task\\.request_item") );