"use strict";

let ticketTable, interactionsState;
let isUrgent = false, isSnoozeOn = false, unsnooze_timeoutHandle;
const gsft_main = document?.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main')?.contentWindow;

////////////////////////// LOGIC
//////////////////////////////////////////////
function clickOnRefreshList() {
    let hamburgerMenu = gsft_main?.document?.querySelector('button#interaction_control_button.btn.btn-default.icon-menu.navbar-btn') 
    || document?.querySelector('button#interaction_control_button.btn.btn-default.icon-menu.navbar-btn');
    hamburgerMenu?.click();
    
	let menuChildItems = gsft_main?.document?.querySelector('div#context_list_titleinteraction.context_menu')?.childNodes 
    || document?.querySelector('div#context_list_titleinteraction.context_menu')?.childNodes;
	menuChildItems?.forEach(e => {if (e.outerText == "Refresh List") e.click()});

	console.log("-----REFRESHED LIST-----");
};

function checkInteractionsQueue() {
    if (!isSnoozeOn) {
        try {
            ticketTable = document?.querySelector("macroponent-f51912f4c700201072b211d4d8c26010")?.shadowRoot?.querySelector("iframe#gsft_main")?.contentWindow?.document?.querySelector("tbody.list2_body") 
			|| document?.querySelector("tbody.list2_body");
			if (ticketTable?.childNodes?.length != 0) {
                chrome.runtime.sendMessage({ message: "ticketAlert" });
			};
		} catch (e){};
	};  
    console.log("-----CHECKED QUEUE-----");
};

function isPageInteractionList() {
	if (document.querySelector("head > title").innerHTML.includes('Interactions')) 
		return true;
	return false;
};


function setSnoozeMin(time) {
    isSnoozeOn = true;
    clearTimeout(unsnooze_timeoutHandle);
    unsnooze_timeoutHandle = setTimeout(() => {
      isSnoozeOn = false
    }, time * 60000);
    console.log(`Snoozed for ${time} minutes`);
};

function unsnoozeAlert() {
    isSnoozeOn = false;
};

const mainIframe = document.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main') || document;
mainIframe?.addEventListener('click', () => {
    if (isPageInteractionList() && !isSnoozeOn) 
        setSnoozeMin(1.5)
});


function timeArrayScraper(tArr) {
	const splitPass = tArr.map((e) => e?.getAttribute("data-original-title")?.split(" ")[0]);
	const filterPass = splitPass.filter((e) => /m$/.test(e));
	const parseIntPass = filterPass.map((e) => parseInt(e));
	for (let i = 0; i < parseIntPass.length; i++) {
		if(parseIntPass[i] >= 22)
			return true;
	};
	return false;
};

function checkUrgencyReason() {
    let elements = document?.querySelector("macroponent-f51912f4c700201072b211d4d8c26010")?.shadowRoot?.querySelector("iframe#gsft_main")?.contentWindow?.document?.querySelectorAll('div.datex.date-calendar') 
	|| document?.querySelectorAll('div.datex.date-calendar');
	
	if (elements) {
		return timeArrayScraper([...elements]);
	};
    return false;
};

////////////////////////// LISTENERS
//////////////////////////////////////////////
chrome.runtime.onMessage.addListener((message) => {
    switch (message.message) {
      case "button1Clicked":
        setSnoozeMin(10);
        break;
      case "button2Clicked":
        setSnoozeMin(5);
        break;
      case "unsnoozeAlert":
        unsnoozeAlert();
        break;
      case "30mBreak":
        setSnoozeMin(30);
        break;
    };
});

////////////////////////// DRIVER
//////////////////////////////////////////////
function scheduleRefreshList() {
    setTimeout(function () {
        if (isPageInteractionList()) {
            clickOnRefreshList();
        };
		scheduleRefreshList();
    }, 3.5 * 60000);
};

function scheduleQueueCheck(n) {
    if (isPageInteractionList()) {
        checkInteractionsQueue();
    };
    setTimeout(() => {
		scheduleQueueCheck(n);
    }, (checkUrgencyReason() ? 5000 : 25000));
};

window.addEventListener('load', function () {
    scheduleRefreshList();
    scheduleQueueCheck(25000);
});