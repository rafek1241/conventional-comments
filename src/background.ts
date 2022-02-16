import * as types from "./types";

chrome.runtime.onInstalled.addListener(() => {
    /* chrome.storage.sync.get({ count: 0 } as IOptions, ({ count }: IOptions) => {
        console.log(count);
    }); */
});

chrome.tabs.onUpdated.addListener((_, changed, tab) => {
    console.log(JSON.stringify(changed));

    if (changed.status === "complete") {
        console.log(tab.url);

        // tODO: for now it does not work as expected. In each content_script.js I use mutation observers.
        // they should be released on cleanup. I don't have idea now, how to do it.

        // tODO: it's one of many
        if (tab.url.match("https?:\/\/(dev\.azure\.com){1}[\/\w\d\sA-Za-z0-9-_]*(pullrequest\/[0-9])+")) {

            // extension-specific styles
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                files: ["build/content_script.css"]
            });

            // page augmentations before insert a extension's content-script
            chrome.scripting.insertCSS({
                target: { tabId: tab.id },
                css: ".repos-pr-details-page{position:relative;}"
            });

            // logic that will handle buttons rendering
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["build/content_script.js"]
            });

        }
    }
});