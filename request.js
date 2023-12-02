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
lookForJourney = recursiveAnchor_Wrap(lookForJourney, document.querySelector("#sys_readonly\\.sc_request\\.number"));
lookForJourney();