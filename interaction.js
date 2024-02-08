"use strict";

class Journey { imsNo = ''; afUser = ''; shortD = ''; longD = ''; reqNo = ''; ritmNo = ''; ritmEnd = '' };
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
function addAgentFieldAutocompleter(element) {
  element.addEventListener("click", (e) => {
    if (!element?.value) {
      const agentName = localStorage.getItem('SNow_Agent_Name');
      element.value = agentName;
    };
  })
};
addAgentFieldAutocompleter = recursiveCheck_Wrapper(addAgentFieldAutocompleter);
addAgentFieldAutocompleter( document.querySelector("#sys_display\\.interaction\\.assigned_to") );


function addRequestButtonEffect(element) {
  element.addEventListener("click", (e) => {
    let interactionState = document.querySelector("#sys_readonly\\.interaction\\.state");
    let interactionNumber = document.querySelector("#sys_readonly\\.interaction\\.number");
    let interactionAfUser = document.querySelector("#sys_display\\.interaction\\.opened_for");
    let interactionShortD = document.querySelector("#interaction\\.short_description");
    let interactionLongD = document.querySelector("#interaction\\.u_description");
    
    const journey = new Journey();
    journey.imsNo = interactionNumber.value;
    journey.afUser = interactionAfUser.value;
    journey.shortD = interactionShortD.value;
    journey.longD = interactionLongD.textContent;
    
    localStorage.setItem(journey.imsNo, JSON.stringify(journey));
    
    if (interactionState?.value == 'new') {
      const categoryField = document.querySelector("#interaction\\.category");
      if (categoryField?.value != "new request")
      categoryField.value = "new request"
    };
  });
}
addRequestButtonEffect = recursiveCheck_Wrapper(addRequestButtonEffect);
addRequestButtonEffect( document.querySelector("#interaction_into_request") );


function anchorIncidentButton(element) {
    element.addEventListener("click", function (e) {

      const interactionState = document.querySelector("#sys_readonly\\.interaction\\.state");
      if (interactionState.value == 'new') {
        let categoryField = document.querySelector("#interaction\\.category");
        if (categoryField?.value != "new incident")
          categoryField.value = "new incident"
      };
    });
  
};
anchorIncidentButton = recursiveCheck_Wrapper(anchorIncidentButton);
anchorIncidentButton( document.querySelector("#ws_create_incident") );