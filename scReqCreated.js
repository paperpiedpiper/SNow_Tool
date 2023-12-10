"use strict";
//==================================================
function recursiveAnchor_Wrap(originalFx, element) {
  let debounceTime = 100;
  function returnElement(element) {
    return element;
  };
  
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
function lookForJourney(imsNumberMessage) {

    if (localStorage.getItem(imsNumberMessage?.innerHTML)) {
        const journey = JSON.parse(localStorage.getItem(imsNumberMessage?.innerHTML));
    
        function processRequestLink(reqNumberLink) {
            journey.reqNo = reqNumberLink?.children[0]?.innerHTML;

            localStorage.setItem(journey.reqNo, JSON.stringify(journey));
            localStorage.removeItem(imsNumberMessage?.innerHTML);
            reqNumberLink?.click();
        };
        processRequestLink = recursiveAnchor_Wrap(processRequestLink, document.querySelector("#requesturl"));
        processRequestLink();
    };
};
lookForJourney = recursiveAnchor_Wrap(lookForJourney, document.querySelector("#output_messages > div > div > div > a"));
lookForJourney();
