"use strict";

let journey;
let imsNumberMessage, longDField, userField;
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

    function lookForRequestFields() {

        longDField = gsft_main?.document.querySelector("#IO\\:d0a8ecb297bbe59041f8b38fe153afb3") || document?.querySelector("#IO\\:d0a8ecb297bbe59041f8b38fe153afb3");

        userField = gsft_main?.document?.querySelector("#sys_display\\.IO\\:4b68a8f297bbe59041f8b38fe153af35") || document?.querySelector("#sys_display\\.IO\\:4b68a8f297bbe59041f8b38fe153af35");

        if (longDField) {
            longDField.textContent = journey.longD;
            userField.value = journey.user;
        } else {
            debounceTime += 10;
            setTimeout(lookForRequestFields, debounceTime);
        };

    };
    lookForRequestFields();
};