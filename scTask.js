"use strict";

let journey;
let ritmNumberField, shortDField, longDField;
let debounceTime = 90;
const gsft_main = document?.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main')?.contentWindow;

function lookForPageAnchor() {
    ritmNumberField = gsft_main?.document?.querySelector("#sys_display\\.sc_task\\.request_item") || document?.querySelector("#sys_display\\.sc_task\\.request_item");
    if (!ritmNumberField) {
        setTimeout(()=>{
            ritmNumberField = gsft_main?.document?.querySelector("#sys_display\\.sc_task\\.request_item") || document?.querySelector("#sys_display\\.sc_task\\.request_item");
        }, 222);
    };
};
if (!ritmNumberField)
    setTimeout(lookForPageAnchor(), 100);


if (sessionStorage.getItem(ritmNumberField?.value)) {
    journey = JSON.parse(sessionStorage.getItem(ritmNumberField?.value));

    function lookForDFields() {
        shortDField = gsft_main?.document?.querySelector("#sc_task\\.short_description") || document?.querySelector("#sc_task\\.short_description");

        longDField = gsft_main?.document?.querySelector("#sc_task\\.description") || document?.querySelector("#sc_task\\.description")

        if (shortDField && longDField) {
            if (!shortDField?.value || shortDField?.value == 'Generic Request')
                shortDField.value = journey.shortD;
            
            if (!longDField?.value)
                longDField.value = journey.longD;

        } else {
            debounceTime += 10;
            setTimeout(lookForDFields, debounceTime);
        };

    };
lookForDFields();
}