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
    processShortDField = recursiveCheck_Wrapper(processShortDField, 100);
    processShortDField( document.querySelector("#sc_req_item\\.short_description") );
  };


};
lookForJourney = recursiveCheck_Wrapper(lookForJourney, 100);
lookForJourney( document.querySelector("#sys_readonly\\.sc_req_item\\.number") );


function setPendingButtonOption(journeyJSON) {
  const button = document.createElement('button');

  button.textContent = 'Set Tracking Task';
  button.setAttribute('id', 'setPendingBtn');
  
  button.style.color = '#FFF';
  button.style.font = '14px Lato, Arial, sans-serif';
  button.style.backgroundColor = '#4F52BD';
  button.style.margin = '0px 500px 0px 4px';
  button.style.padding = '0px 10px';
  button.style.width = '150px';
  button.style.height = '32px';
  button.style.fontWeight = '700';
  
  document.querySelector("#list_nav_sc_req_item\\.sc_task\\.request_item > div > div.nav.navbar-right.text-align-right").prepend(button);
  
  document.querySelector("#setPendingBtn").addEventListener("click", (e) => {
    const FieldMap = new Map();
  
    function mapSctaskEntry() {
      let tableHeader_Children = document.querySelector("#hdr_sc_req_item\\.sc_task\\.request_item").children
      const nameValues = Array.from(tableHeader_Children).map(th => th.getAttribute('name'));
      const sctaskEntry_Children = document.querySelector("#sc_req_item\\.sc_task\\.request_item_table > tbody").children[0].children;
  
  
      const trackedNames = ['state', 'assignment_group', 'assigned_to', 'short_description'];
      for (let i = 1; i < nameValues.length; i++ ) {
        
        if (trackedNames.includes(nameValues[i])) {
          FieldMap.set(nameValues[i], sctaskEntry_Children[i]);
        }
      }
    };
    mapSctaskEntry();

    
    
  if (FieldMap.get('state')?.textContent == 'Open' && FieldMap.get('assigned_to')?.innerText == '(empty)' && FieldMap.get('assignment_group')?.innerText == 'GDM - L1 Global Service Desk (STT)') {
    document.querySelector("#setPendingBtn").remove();
    
// ////////////////////////////////////////////////////////////////////////

    function doubleClickEl (trgt) {
      trgt.dispatchEvent(new MouseEvent('dblclick', {
      bubbles: true,
      cancelable: true,
      view: window
      }));
    };

    let setFieldValue = (val) => {
      document.querySelector("#cell_edit_value").value = val;
    };

    let setNameFieldValue = (val) => {
      document.querySelector("#sys_display\\.LIST_EDIT_sc_task\\.assigned_to").value = val;
    };
/////////////////
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const executeAsyncClicks = async () => {
  try {
    const doubleClickState = recursiveCheck_Wrapper(doubleClickEl, 100);
    await doubleClickState( FieldMap.get('state'));
    await delay(500);

    const setStateValue =  recursiveCheck_Wrapper(() => { setFieldValue('-5') }, 10);
    await setStateValue( document.querySelector("#cell_edit_value") );
    await delay(500);

    await document.querySelector("#cell_edit_ok")?.click();
    await delay(500);

    const doubleClickShortD = recursiveCheck_Wrapper(doubleClickEl, 100);
    await doubleClickShortD( FieldMap.get('short_description') );
    await delay(500);

    const setShortDValue =  recursiveCheck_Wrapper(() => { setFieldValue(`${document.querySelector("#sc_req_item\\.short_description").value} # tracking task`) }, 10);
    await setShortDValue( document.querySelector("#cell_edit_value") );
    await delay(500);

    await document.querySelector("#cell_edit_ok")?.click();
    await delay(500);

    const doubleClickAssignedTo =  recursiveCheck_Wrapper(doubleClickEl, 100);
    await doubleClickAssignedTo( FieldMap.get('assigned_to') );
    await delay(500);

    const setAssignedTo =  recursiveCheck_Wrapper(() => { setNameFieldValue(localStorage.getItem('SNow_Agent_Name')) }, 10);
    await setAssignedTo( document.querySelector("#sys_display\\.LIST_EDIT_sc_task\\.assigned_to") );

    // TODO: implement "Click Me" message for user

  } catch (e) { console.error(e) }
};
executeAsyncClicks();

    } else {
      console.log(document.querySelector("#setPendingBtn").textContent = "Not a new ticket!");
    setTimeout(() => {
      document.querySelector("#setPendingBtn").remove();
    }, 4000);

    };
  });
};
setPendingButtonOption = recursiveCheck_Wrapper(setPendingButtonOption);
if (document.querySelector("#sc_req_item\\.sc_task\\.request_item_table > tbody").childElementCount == 1)
  setPendingButtonOption( sessionStorage.getItem(document.querySelector("#sys_readonly\\.sc_req_item\\.number")?.value) );