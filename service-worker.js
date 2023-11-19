"use strict";

chrome.runtime.onMessage.addListener((message) => {
  switch (message.message) {
    case "ticketAlert":
      createNotification();
      break;
  }
});

function createNotification() {
  let tabHandles;
  chrome.tabs.query({ url: 'https://gaia.service-now.com/now/nav/ui/classic/params/target/interaction_list.do*' }, function (tabs) {
    tabHandles = tabs;
  });
  
  const options = {
    type: "basic",
    title: "Alert",
    message: "Unassigned tickets in!",
    iconUrl: "images/alert.png",
    buttons: [{
      title: "Snooze for 10 minutes",
      iconUrl: "images/snooze1.png",
    },
  {
    title: "Snooze for 5 minutes",
    iconUrl: "images/snooze2.png"
  }]
  };
  chrome.notifications.create("unassignedAlert", options);

  chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    if (notifId == "unassignedAlert") {
      if (btnIdx == 0) {
        tabHandles.forEach(e => chrome.tabs.sendMessage(e.id, { message: "button1Clicked" }))
      }
      else if (btnIdx == 1) {
        tabHandles.forEach(e => chrome.tabs.sendMessage(e.id, { message: "button2Clicked" }))
      }
    }
  });

  setTimeout(function(){
    chrome.notifications.clear("unassignedAlert");
  }, 7*1000);
};