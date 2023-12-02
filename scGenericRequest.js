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
function lookForJourney(imsNumberMessage) {

    if (localStorage.getItem(imsNumberMessage?.innerHTML)) {
        const journey = JSON.parse(localStorage.getItem(imsNumberMessage?.innerHTML));

        function autocompleteOrderDetails(longDField) {
            longDField.textContent = journey.longD;

            const userField = document.querySelector("#sys_display\\.IO\\:4b68a8f297bbe59041f8b38fe153af35");
            userField.value = journey.afUser;
        };
        autocompleteOrderDetails = recursiveAnchor_Wrap(autocompleteOrderDetails, document.querySelector("#IO\\:d0a8ecb297bbe59041f8b38fe153afb3"));
        autocompleteOrderDetails();
    };
}
lookForJourney = recursiveAnchor_Wrap(lookForJourney, document.querySelector("#output_messages > div > div > div > a"));
lookForJourney();