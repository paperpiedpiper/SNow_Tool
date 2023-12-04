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


  function setPendingButtonOption() {
    const button = document.createElement('button');

    button.textContent = 'Set Pending';
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
    
    document.querySelector("#setPendingBtn").addEventListener("click", () => {
      document.querySelector("#setPendingBtn").remove();
      const FieldMap = new Map();
    
      function mapSctaskEntry() {
        let tableHeader_Children = document.querySelector("#hdr_sc_req_item\\.sc_task\\.request_item").children
        const nameValues = Array.from(tableHeader_Children).map(th => th.getAttribute('name'));
        const sctaskEntry_Children = document.querySelector("#sc_req_item\\.sc_task\\.request_item_table > tbody").children[0].children;
    
    
        const trackedNames = ['state', 'assignment group', 'assigned_to', 'short_description'];
        for (let i = 1; i < nameValues.length; i++ ) {
          
          if (trackedNames.includes(nameValues[i])) {
            FieldMap.set(nameValues[i], sctaskEntry_Children[i]);
          }
        }
      };
      mapSctaskEntry();
      
      if (FieldMap.get('state')?.textContent == 'Open' && FieldMap.get('assigned_to')?.innerText == '(empty)') {

        function getCellEdit() {return document.querySelector("#cell_edit_value")};
        function getCellOk() {return document.querySelector("#cell_edit_ok")}
        function getNameCellEdit() {return document.querySelector("#sys_display\\.LIST_EDIT_sc_task\\.assigned_to")};
        function getCurrSField() {return document.querySelector("#sc_req_item\\.short_description")};

        setTimeout(() => {
          let ticketFieldArea = FieldMap.get('state');
            
          ticketFieldArea.dispatchEvent(new MouseEvent('dblclick', {
          bubbles: true,
          cancelable: true,
          view: window
          }));
      
          setTimeout(()=>{
            getCellEdit().value = '-5'}, 350);
          setTimeout(()=>{getCellOk().click()}, 700)
      
      
          setTimeout(() => {
            let ticketFieldArea = FieldMap.get('short_description');
      
            ticketFieldArea.dispatchEvent(new MouseEvent('dblclick', {
            bubbles: true,
            cancelable: true,
            view: window
            }));
      
            setTimeout(()=>{
              getCellEdit().value = `${getCurrSField.value} | tracking task`}, 350)
            setTimeout(()=>{getCellOk().click()}, 700)
      
            setTimeout(() => {
              let ticketFieldArea = FieldMap.get('assigned_to');
      
              ticketFieldArea.dispatchEvent(new MouseEvent('dblclick', {
              bubbles: true,
              cancelable: true,
              view: window
              }));
      
              setTimeout(() => {getNameCellEdit().value = localStorage.getItem('SNow_Agent_Name')}, 300);
            }, 1000);
      
          }, 1000);
      
        }, 0);

      };
    });
  };
  setPendingButtonOption = recursiveAnchor_Wrap(setPendingButtonOption, document.querySelector("#sc_req_item\\.sc_task\\.request_item_table"));
  if (document.querySelector("#sc_req_item\\.sc_task\\.request_item_table > tbody").childElementCount == 1)
    setPendingButtonOption();
};
lookForJourney = recursiveAnchor_Wrap(lookForJourney, document.querySelector("#sys_readonly\\.sc_req_item\\.number"));
lookForJourney();