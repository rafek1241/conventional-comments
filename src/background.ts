import { defaultSites } from './data';
let sites = defaultSites;

chrome.runtime.onInstalled.addListener(() => {
  /* chrome.storage.sync.get({ count: 0 } as IOptions, ({ count }: IOptions) => {
      console.log(count);
  }); */
});

sites.forEach(site => {
  chrome.webNavigation.onCompleted.addListener(frame => {
    // extension-specific styles
    chrome.scripting.insertCSS({
      target: { tabId: frame.tabId },
      files: ["build/content_script.css"]
    });

    // page augmentations before insert a extension's content-script
    chrome.scripting.insertCSS({
      target: { tabId: frame.tabId },
      css: site.additionalStyles
    });

    // logic that will handle buttons rendering
    chrome.scripting.executeScript({
      target: { tabId: frame.tabId },
      files: ["build/content_script.js"],
      args: [site.name]
    });
  }, { url: site.filters });
});
