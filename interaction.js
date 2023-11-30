"use strict";

let interactionNumber, interactionState, interactionUser, interactionShortD, interactionLongD;
let agentName, assignedToField;
let debounceTime = 90;
let categoryField, isCategoryFieldClicked = false, popupCloseBtn, isFirstRequestClick = true, isFirstIncidentClick = true;
const gsft_main = document?.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main')?.contentWindow;

class Journey {
    imsNo = '';
    shortD = '';
    longD = '';
    user = '';
    reqNo = '';
    ritmNo = '';
    ritmEnd = '';
};

function anchorCategoryFieldListener() {
  categoryField = gsft_main?.document.querySelector("#interaction\\.category") || document.querySelector("#interaction\\.category");  
  if (categoryField) {
    categoryField.addEventListener("click", function (e) {isCategoryFieldClicked = true});
    debounceTime = 90;
  } else {
    setTimeout(anchorCategoryFieldListener, debounceTime);
  };
};
anchorCategoryFieldListener();

function anchorRequestButton() {
    const createRequestBtn = gsft_main?.document?.querySelector("#interaction_into_request") || document?.querySelector("#interaction_into_request");
    if (createRequestBtn) {
      createRequestBtn.addEventListener("click", function (e) {
        interactionState = gsft_main?.document?.querySelector("#sys_readonly\\.interaction\\.state") || document?.querySelector("#sys_readonly\\.interaction\\.state");
        interactionNumber = gsft_main?.document?.querySelector("#sys_readonly\\.interaction\\.number") || document?.querySelector("#sys_readonly\\.interaction\\.number");
        interactionUser = gsft_main?.document?.querySelector("#sys_display\\.interaction\\.opened_for") || document?.querySelector("#sys_display\\.interaction\\.opened_for");
        interactionShortD = gsft_main?.document?.querySelector("#interaction\\.short_description") || document?.querySelector("#interaction\\.short_description");
        interactionLongD = gsft_main?.document?.querySelector("#interaction\\.u_description") || document?.querySelector("#interaction\\.u_description");
        const journey = new Journey();
        journey.imsNo = interactionNumber.value;
        journey.user = interactionUser.value;
        journey.shortD = interactionShortD.value;
        journey.longD = interactionLongD.textContent;
        localStorage.setItem(journey.imsNo, JSON.stringify(journey));

        if (interactionState.value == 'new') {

          categoryField = gsft_main?.document.querySelector("#interaction\\.category") || document.querySelector("#interaction\\.category");
          if (categoryField?.value != "new request")
            categoryField.value = "new request"
            
          if (!assignedToField?.value) {
          agentName = localStorage.getItem('SNow_Agent_Name');
          if (!agentName) {
            agentName = document?.querySelector("body > macroponent-f51912f4c700201072b211d4d8c26010")?.shadowRoot?.querySelector("div > sn-canvas-appshell-root > sn-canvas-appshell-layout > sn-polaris-layout")?.shadowRoot.querySelector("div.sn-polaris-layout.polaris-enabled > div.layout-main > div.header-bar > sn-polaris-header")?.shadowRoot?.querySelector("#userMenu > span > span:nth-child(2) > div > div.user-menu-header.polaris-enabled > div > span > div")?.innerHTML;
            localStorage.setItem('SNow_Agent_Name', agentName);
          };

          assignedToField = gsft_main?.document.querySelector("#sys_display\\.interaction\\.assigned_to") || document.querySelector("#sys_display\\.interaction\\.assigned_to");
          assignedToField.value = agentName;
          };

          
          if (isFirstRequestClick && !isCategoryFieldClicked) {

            function lookforPopupCloseButton() {
              popupCloseBtn = gsft_main?.document?.querySelector("#popup_close_image")  || document?.querySelector("#popup_close_image");
              if (popupCloseBtn) {
                debounceTime = 90;
                isFirstRequestClick = false;
                popupCloseBtn.click();
              } else {
                debounceTime += 10;
                setTimeout(lookforPopupCloseButton, debounceTime);
              };
            };
            lookforPopupCloseButton();
          }

        };
      });
      debounceTime = 90;
    } else {
        debounceTime += 10;
        setTimeout(anchorRequestButton, debounceTime);
    };

};
anchorRequestButton();

function anchorIncidentButton() {
  const createIncidentBtn = gsft_main?.document.querySelector("#ws_create_incident") || document.querySelector("#ws_create_incident")
  if (createIncidentBtn) {
    createIncidentBtn.addEventListener("click", function (e) {
      interactionState = gsft_main?.document?.querySelector("#sys_readonly\\.interaction\\.state") || document?.querySelector("#sys_readonly\\.interaction\\.state");
      if (interactionState.value == 'new') {

        categoryField = gsft_main?.document.querySelector("#interaction\\.category") || document.querySelector("#interaction\\.category");
        if (categoryField?.value != "new incident")
          categoryField.value = "new incident"
          
        if (!assignedToField?.value) {
        agentName = localStorage.getItem('SNow_Agent_Name');
        if (!agentName) {
          agentName = document?.querySelector("body > macroponent-f51912f4c700201072b211d4d8c26010")?.shadowRoot?.querySelector("div > sn-canvas-appshell-root > sn-canvas-appshell-layout > sn-polaris-layout")?.shadowRoot.querySelector("div.sn-polaris-layout.polaris-enabled > div.layout-main > div.header-bar > sn-polaris-header")?.shadowRoot?.querySelector("#userMenu > span > span:nth-child(2) > div > div.user-menu-header.polaris-enabled > div > span > div")?.innerHTML;
          localStorage.setItem('SNow_Agent_Name', agentName);
        };

          assignedToField = gsft_main?.document.querySelector("#sys_display\\.interaction\\.assigned_to") || document.querySelector("#sys_display\\.interaction\\.assigned_to");
          assignedToField.value = agentName;
        };

        
        
        if (isFirstRequestClick && !isCategoryFieldClicked) {

          function lookforPopupCloseButton() {
            popupCloseBtn = gsft_main?.document?.querySelector("#popup_close_image")  || document?.querySelector("#popup_close_image");
            if (popupCloseBtn) {
              debounceTime = 90;
              isFirstRequestClick = false;
              popupCloseBtn.click();
            } else {
              debounceTime += 10;
              setTimeout(lookforPopupCloseButton, debounceTime);
            };
          };
          lookforPopupCloseButton();
        }

      };
    });
  } else {
      debounceTime += 10;
      setTimeout(anchorIncidentButton, debounceTime);
  };
  
};
anchorIncidentButton();