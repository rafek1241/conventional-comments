import { defaultSites, LocalStorageKeys } from './data';
let sites = defaultSites;

chrome.runtime.onInstalled.addListener(() => {
  /* chrome.storage.sync.get({ count: 0 } as IOptions, ({ count }: IOptions) => {
      console.log(count);
  }); */
});

sites.forEach(site => {
  chrome.webNavigation.onCompleted.addListener(frame => {

    chrome.storage.local.set({ [LocalStorageKeys.CurrentSite]: site });

    // extension-specific styles
    chrome.scripting.insertCSS({
      target: { tabId: frame.tabId },
      files: ["build/content_script.css"]
    });

    // page augmentations before insert a extension's content-script
    chrome.scripting.insertCSS({
      target: { tabId: frame.tabId },
      css: site.styles
    });

    // logic that will handle buttons rendering
    chrome.scripting.executeScript({
      target: { tabId: frame.tabId },
      files: ["build/content_script.js"]
    });
  }, { url: site.filters });
});
