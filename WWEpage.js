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

findTableAndRun = recursiveCheck_Wrapper(scheduleReadState);
findTableAndRun( document.querySelector("#wwe-workspace-item-0") );