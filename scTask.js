"use strict";
//==================================================
function returnElement(element) {
  return element;
};

function recursiveAnchor_Wrap(originalFx, element) {
  let debounceTime = 100;

  function checkInner() {

    if (!returnElement(element)) {
      debounceTime += 10;
      setTimeout(checkInner, debounceTime);
      return;
    };

    originalFx(returnElement(element));
  };

  return checkInner;
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
        processDFields = recursiveAnchor_Wrap(processDFields, document.querySelector("#sc_task\\.short_description"));
        processDFields();
    };
};
lookForJourney = recursiveAnchor_Wrap(lookForJourney, document.querySelector("#sys_display\\.sc_task\\.request_item"));
lookForJourney();