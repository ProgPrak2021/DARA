async function injectFunction(tabId: number, functionName: Function) {
  const funString = functionName.toString();
  const funBody = funString.slice(funString.indexOf("{") + 1, funString.lastIndexOf("}"));
  await chrome.tabs.executeScript(tabId, {
    code: funBody,
  });
}

import {
  facebookRequest,
  facebookCheck,
  facebookDownload,
} from "./scripts/facebook";

try {

  // This file is ran as a background script
  console.log("Hello from background script!");

  let services = ["facebook"];

  // Listener for the messages from extension ()
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background.js!", message);
    if (['request', 'check', 'download'].includes(message.type)) {
      // Listen for tabs update
      chrome.tabs.onUpdated.addListener(async function onUpdated(tabId, changeInfo, tab) {
        //check if the tab has been loaded
        if (tab.status === "complete") {
          console.log("The new tab has been loaded");

          // check for which service, type of message
          const { host } = new URL(tab.url ?? "");
          const { type } = message;
          console.log(host);

          if (host === "www.facebook.com") {
            if (type === "request") {
              console.log("Injecting request script");
              await injectFunction(tabId, facebookRequest);
            }

            if (type === "check") {
              console.log("Injecting check script");
              //let result = await injectFunction(tab, facebookCheck);
              await injectFunction(tabId, facebookCheck);
              //console.log("result ===> ", result);
              //chrome.runtime.sendMessage(result);
            }

            if (type === "download") {
              console.log("Injecting download script");
              await injectFunction(tabId, facebookDownload);
            }
          }
          chrome.tabs.onUpdated.removeListener(onUpdated);
        }
      });
    }
  });
} catch (e) {
  console.error(e);
}