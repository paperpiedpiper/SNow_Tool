"use strict";

document.querySelector("button#unsnooze").addEventListener("click", function () {
    chrome.tabs.query({ url: 'https://gaia.service-now.com/now/nav/ui/classic/params/target/interaction_list.do*' }, function (tabs) {
        tabs.forEach(e => {chrome.tabs.sendMessage(e.id, { message: "unsnoozeAlert" });})
});
    window.close();
});
document.querySelector("button#half_hour_break").addEventListener("click", function () {
    chrome.tabs.query({ url: 'https://gaia.service-now.com/now/nav/ui/classic/params/target/interaction_list.do*' }, function (tabs) {
        tabs.forEach(e => {chrome.tabs.sendMessage(e.id, { message: "30mBreak" });})
    });
    window.close();
});