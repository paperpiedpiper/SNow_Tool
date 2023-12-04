"use strict";

chrome.runtime.onMessage.addListener((message) => {
  switch (message.message) {
    case "ticketAlert":
      createNotification("ticketAlert");
      break;
    case "logoffAlert":
      createNotification("logoffAlert");
  }
});

function createNotification(notificationType) {

  switch (notificationType) {
    case "ticketAlert": {
      let tabHandles;
      chrome.tabs.query({ url: ['https://gaia.service-now.com/now/nav/ui/classic/params/target/interaction_list.do*', 'https://gaia.service-now.com/interaction_list.do*'] }, (tabs) => {
        tabHandles = tabs;
      });
      
      const ticketAlert_options = {
        type: "basic",
        title: "Alert",
        message: "Unassigned tickets in !",
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
      chrome.notifications.create("queueAlert", ticketAlert_options);

      chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
        if (notifId == "queueAlert") {
          if (btnIdx == 0) {
            tabHandles.forEach(e => chrome.tabs.sendMessage(e.id, { message: "button1Clicked" }))
          }
          else if (btnIdx == 1) {
            tabHandles.forEach(e => chrome.tabs.sendMessage(e.id, { message: "button2Clicked" }))
          };
        };
      });

      setTimeout(() => {
        chrome.notifications.clear("queueAlert");
      }, 7 * 1000);
      break;
    };

    case "logoffAlert": {
      let tabId;
      chrome.tabs.query({ url: 'https://wwe-emea.stefanini.com/ui/ad/v1/index.html*' }, function (tabs) {
        tabId = tabs[0].id;

        const logoffWarning_options = {
          type: "basic",
          title: "WARNING",
          message: "You are logged off from WWE Genesys !",
          iconUrl: "images/alert.png",
          buttons: [{
            title: "Take me to the tab",
            iconUrl: "images/snooze1.png",
          }]
        };
        chrome.notifications.create("logoffWarning", logoffWarning_options);

        chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
          if (notifId == "logoffWarning") {
            if (btnIdx == 0) {
              chrome.tabs.update(tabId, { active: true, highlighted: true });
            }
          }
        });

        setTimeout(() => {
          chrome.notifications.clear("logoffWarning");
        }, 7 * 1000);
      });
      break;
    }
  };
};