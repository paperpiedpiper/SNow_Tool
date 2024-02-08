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

        function autocompleteOrderDetails(longDField) {
            longDField.textContent = journey.longD;

            const userField = document.querySelector("#sys_display\\.IO\\:4b68a8f297bbe59041f8b38fe153af35");
            userField.value = journey.afUser;
        };
        autocompleteOrderDetails = recursiveCheck_Wrapper(autocompleteOrderDetails);
        autocompleteOrderDetails( document.querySelector("#IO\\:d0a8ecb297bbe59041f8b38fe153afb3") );
    };
}
lookForJourney = recursiveCheck_Wrapper(lookForJourney);
lookForJourney( document.querySelector("#output_messages > div > div > div > a") );

function addOrderNowCheck(orderButton) {
  orderButton.addEventListener("click", (e) => {
    const userField = document.querySelector("#sys_display\\.IO\\:4b68a8f297bbe59041f8b38fe153af35");
    const longDField = document.querySelector("#IO\\:d0a8ecb297bbe59041f8b38fe153afb3");
    const imsNumberMessage = document.querySelector("#output_messages > div > div > div > a");
    const journey = JSON.parse(localStorage.getItem(imsNumberMessage?.innerHTML));

    if (userField.value != journey.afUser || longDField.textContent != journey.longD) {
      journey.afUser = userField.value;
      journey.longD = longDField.textContent;
      localStorage.setItem(imsNumberMessage?.innerHTML, JSON.stringify(journey));
    };

  });
}
addOrderNowCheck = recursiveCheck_Wrapper(addOrderNowCheck);
addOrderNowCheck( document.querySelector("#oi_order_now_button") );