"use strict";

let isUrgent = false, isSnoozeOn = false, unsnooze_timeoutHandle;

////////////////////////// LOGIC
//////////////////////////////////////////////
function clickRefreshList() {
    let hamburgerMenu = document.querySelector('button#interaction_control_button.btn.btn-default.icon-menu.navbar-btn');
	let menuChildItems = document.querySelector('div#context_list_titleinteraction.context_menu')?.childNodes;
    
    hamburgerMenu?.click();
	menuChildItems?.forEach(e => {if (e.outerText == "Refresh List") e.click()});

	console.log("-----REFRESHED LIST-----");
};

function checkInteractionsQueue() {
    if (!isSnoozeOn) {
        const ticketTable = document.querySelector("tbody.list2_body");
        if (ticketTable?.childNodes?.length != 0) {
            chrome.runtime.sendMessage({ message: "ticketAlert" });
        };
	};

    console.log("-----CHECKED QUEUE-----");
};

function isPageInteractionList() {
	if (document.querySelector("head > title").innerHTML.includes('Interactions')) {
		return true;
    };
	return false;
};

//--//
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

//--//
function checkUrgency() {
    let elements = document.querySelectorAll('div.datex.date-calendar');
	
	if (elements) {
        return timeArrayScraper([...elements]);
	};
    return false;
};

function timeArrayScraper(tArr) {
    const splitPass = tArr.map((e) => e?.getAttribute("data-original-title")?.split(" ")[0]);
    const filterPass = splitPass.filter((e) => /m$/.test(e));
    const parseIntPass = filterPass.map((e) => parseInt(e));   

    for (let i = 0; i < parseIntPass.length; i++) {
        if (parseIntPass[i] >= 22) {
            return true;
        };
    };

    return false;
};
////////////////////////// LISTENERS
//////////////////////////////////////////////
window.addEventListener('click', () => {
    if (isPageInteractionList() && !isSnoozeOn) 
        setSnoozeMin(1.5)
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
                
window.addEventListener('load', () => {
        scheduleRefreshList();
    scheduleQueueCheck(25000);
});

////////////////////////// DRIVER
//////////////////////////////////////////////
function scheduleRefreshList() {
    setTimeout(() => {
        scheduleRefreshList();

        if (isPageInteractionList()) {
            clickRefreshList();
        };
    }, 2 * 60000);
};

function scheduleQueueCheck(n) {
    setTimeout(() => {
        scheduleQueueCheck(n);
        
        if (isPageInteractionList()) {
            checkInteractionsQueue();
        };
    }, (checkUrgency() ? 5000 : 25000));
};