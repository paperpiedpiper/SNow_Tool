"use strict";

let ticketTable;
let interactionsState;

let isUrgent = false,
    isSnoozeOn = false,
    unsnooze_timeoutHandle;

function clickOnRefreshList() {
	console.log("-----REFRESHED LIST-----");
	let hamburgerMenu = document?.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main')?.contentWindow?.document?.querySelector('button#interaction_control_button.btn.btn-default.icon-menu.navbar-btn') 
    || document?.querySelector('button#interaction_control_button.btn.btn-default.icon-menu.navbar-btn');
    hamburgerMenu?.click();

	let menuChildItems = document?.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main')?.contentWindow?.document?.querySelector('div#context_list_titleinteraction.context_menu')?.childNodes 
    || document?.querySelector('div#context_list_titleinteraction.context_menu')?.childNodes;
	menuChildItems?.forEach(e => {if (e.outerText == "Refresh List") e.click()});
};

function checkInteractionsQueue() {
    console.log("-----CHECKED QUEUE-----");
	if (!isSnoozeOn) {
		try {
			ticketTable = document?.querySelector("macroponent-f51912f4c700201072b211d4d8c26010")?.shadowRoot?.querySelector("iframe#gsft_main")?.contentWindow?.document?.querySelector("tbody.list2_body") 
			|| document?.querySelector("tbody.list2_body");
			if (ticketTable?.childNodes?.length != 0) {
				chrome.runtime.sendMessage({ message: "ticketAlert" });
			};
		} catch (e){};
	};  
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

function checkCurrentPage() {
	if (document.querySelector("body > macroponent-f51912f4c700201072b211d4d8c26010").shadowRoot.querySelector("div > sn-canvas-appshell-root > sn-canvas-appshell-layout > sn-polaris-layout").shadowRoot.querySelector("div.sn-polaris-layout.polaris-enabled > div.layout-main > div.header-bar > sn-polaris-header").shadowRoot.querySelector("nav > div > div.center-header-zone > div > span.experience-title").outerText == 'Interactions') 
		return true;
	return false;
};

function timeArrayScraper(tArr) {
	const splitPass = tArr.map((e) => e?.getAttribute("data-original-title")?.split(" ")[0]);
	const filterPass = splitPass.filter((e) => /m$/.test(e));
	const parseIntPass = filterPass.map((e) => parseInt(e));
	for (let i = 0; i < parseIntPass.length; i++) {
		if(parseIntPass[i] >= 25)
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

function scheduleRefreshList() {
    setTimeout(function () {
        if (checkCurrentPage()) {
            clickOnRefreshList();
        };
		scheduleRefreshList();
    }, 3.5 * 60000);
}

function scheduleCheckInteractions(n) {
    setTimeout(function () {
        if (checkCurrentPage()) {
            checkInteractionsQueue();
        };
		scheduleCheckInteractions(n);
    }, checkUrgencyReason() ? 5000 : 25000);
}

window.addEventListener('load', function () {
    scheduleRefreshList();               // Initial
    scheduleCheckInteractions(25000);   // Start
});

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

const mainIframe = document.querySelector('macroponent-f51912f4c700201072b211d4d8c26010')?.shadowRoot?.querySelector('iframe#gsft_main') || document;
mainIframe?.addEventListener('click', () => {
    if (checkCurrentPage() && !isSnoozeOn) 
        setSnoozeMin(1.5)
});