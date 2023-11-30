"use strict";

let journey;
let ritmNumberField, shortDField, bannerElement, saveBtn;
let debounceTime = 90;
const gsft_main = document?.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main')?.contentWindow;

function lookForPageAnchor() {
    ritmNumberField = gsft_main?.document?.querySelector("#sys_readonly\\.sc_req_item\\.number") || document?.querySelector("#sys_readonly\\.sc_req_item\\.number");
    if (!ritmNumberField) {
        setTimeout(()=>{
            ritmNumberField = pageAnchor();
        }, 222);
    };
};
lookForPageAnchor();
if (!ritmNumberField)
    setTimeout(lookForPageAnchor(), 100);


if (localStorage.getItem(ritmNumberField?.value)) {
    journey = JSON.parse(localStorage.getItem(ritmNumberField?.value));

    function lookForShortDField() {

        shortDField = gsft_main?.document?.querySelector("#sc_req_item\\.short_description") || document?.querySelector("#sc_req_item\\.short_description");
        if (shortDField) {
            if (!journey.ritmEnd) {
                shortDField.value = journey.shortD;

                journey.ritmEnd = 'true';
                sessionStorage.setItem(ritmNumberField?.value, JSON.stringify(journey));
                localStorage.removeItem(ritmNumberField?.value);
                

                bannerElement = gsft_main?.document?.querySelector("#sc_req_item\\.form_header")?.children[1]?.children[0]?.children[0] || document?.querySelector("#sc_req_item\\.form_header")?.children[1]?.children[0]?.children[0];
                bannerElement.dispatchEvent(new Event('contextmenu', {
                    bubbles: true,
                    button: 2,
                }));
                saveBtn = gsft_main?.document?.querySelector("#context_1 > div.context_item.accessibility_no_tooltip") || document?.querySelector("#context_1 > div.context_item.accessibility_no_tooltip");
                saveBtn.click();
            };

        } else {
            debounceTime += 10;
            setTimeout(lookForShortDField, debounceTime);
        };

    };
    lookForShortDField();
};