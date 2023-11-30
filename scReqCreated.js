"use strict";

let journey;
let reqCreatedMessage, imsNumberMessage, requestNumberLink;
let debounceTime = 90;
const gsft_main = document?.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main')?.contentWindow;

function lookForPageAnchor() {
    imsNumberMessage = gsft_main?.document?.querySelector("#output_messages > div > div > div > a") || document?.querySelector("#output_messages > div > div > div > a");
    if (!imsNumberMessage) {
        setTimeout(()=>{
            imsNumberMessage = gsft_main?.document?.querySelector("#output_messages > div > div > div > a") || document?.querySelector("#output_messages > div > div > div > a");
        }, 222);
    };
};
lookForPageAnchor();
if (!imsNumberMessage)
    setTimeout(lookForPageAnchor(), 100);


if (localStorage.getItem(imsNumberMessage?.innerHTML)) {
    journey = JSON.parse(localStorage.getItem(imsNumberMessage?.innerHTML));

    function lookForRequestLink() {
        requestNumberLink = gsft_main?.document?.querySelector("#requesturl") || document?.querySelector("#requesturl");

        if (requestNumberLink) {
            journey.reqNo = requestNumberLink?.firstElementChild?.innerHTML;

            if (journey.reqNo) {
                localStorage.setItem(journey.reqNo, JSON.stringify(journey));
                localStorage.removeItem(imsNumberMessage?.innerHTML);
                requestNumberLink?.click();
            };

        } else {
            debounceTime += 10;
            setTimeout(lookForRequestLink, debounceTime);
        };

    };
    lookForRequestLink();
};