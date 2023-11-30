"use strict";

let journey;
let reqNumberField, ritmNumberLink;
let debounceTime = 90;
const gsft_main = document?.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main')?.contentWindow;

function lookForPageAnchor() {
    reqNumberField = gsft_main?.document?.querySelector("#sys_readonly\\.sc_request\\.number") || document?.querySelector("#sys_readonly\\.sc_request\\.number");
    if (!reqNumberField) {
        setTimeout(()=>{
            reqNumberField = gsft_main?.document?.querySelector("#sys_readonly\\.sc_request\\.number") || document?.querySelector("#sys_readonly\\.sc_request\\.number");
        }, 222);
    };
};
lookForPageAnchor();
if (!reqNumberField)
    setTimeout(lookForPageAnchor(), 100);


if (localStorage.getItem(reqNumberField?.value)) {
    journey = JSON.parse(localStorage.getItem(reqNumberField?.value));

    function lookForRitmLink() {
        ritmNumberLink = gsft_main?.document?.querySelector("#sc_request\\.sc_req_item\\.request_table > tbody")?.children[0]?.children[2]?.children[0] || document?.querySelector("#sc_request\\.sc_req_item\\.request_table > tbody")?.children[0]?.children[2]?.children[0];

        if (ritmNumberLink) {
            journey.ritmNo = ritmNumberLink?.innerHTML;
    
            if (journey.reqNo) {
                localStorage.setItem(journey.ritmNo, JSON.stringify(journey));
                localStorage.removeItem(journey.reqNo);
                ritmNumberLink?.click();
            };

        } else {
            debounceTime += 10;
            setTimeout(lookForRitmLink, debounceTime);
        };

    };
    lookForRitmLink();
};