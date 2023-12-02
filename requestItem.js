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
    }

    originalFx(returnElement(element));
  }

  return checkInner;
}
//==================================================
//==================================================
function lookForJourney(ritmNumberField) {

    if (localStorage.getItem(ritmNumberField?.value)) {
        const journey = JSON.parse(localStorage.getItem(ritmNumberField?.value));

        function processShortDField(shortDField) {

            if (!journey.ritmEnd) {
                shortDField.value = journey.shortD;

                journey.ritmEnd = 'true';
                sessionStorage.setItem(ritmNumberField?.value, JSON.stringify(journey));
                localStorage.removeItem(ritmNumberField?.value);

                const bannerElement = document.querySelector("#sc_req_item\\.form_header")?.children[1]?.children[0]?.children[0];
                bannerElement.dispatchEvent(new Event('contextmenu', {
                    bubbles: true,
                    button: 2,
                }));
                const saveBtn = document.querySelector("#context_1 > div.context_item.accessibility_no_tooltip");
                saveBtn.click();
            };
        };
        processShortDField = recursiveAnchor_Wrap(processShortDField, document.querySelector("#sc_req_item\\.short_description"));
        processShortDField();
    };
};
lookForJourney = recursiveAnchor_Wrap(lookForJourney, document.querySelector("#sys_readonly\\.sc_req_item\\.number"));
lookForJourney();