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
function readAgentState() {
    const agentState = document.querySelector("#DataTables_Table_0 > tbody > tr > td:nth-child(2) > div.state-text").textContent;
    if (agentState == 'Logged Off') {
        chrome.runtime.sendMessage({ message: "logoffAlert" });
    };

    console.log("-----CHECKED STATE-----");
};

//==================================================
function scheduleReadState() {
    setTimeout(() => {
        readAgentState();
        scheduleReadState();
    }, 60000);
};

function findTableAndRun() {
    scheduleReadState();
};
findTableAndRun = recursiveAnchor_Wrap(findTableAndRun, document.querySelector("#wwe-workspace-item-0"));
findTableAndRun();