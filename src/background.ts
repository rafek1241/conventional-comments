chrome.runtime.onInstalled.addListener(() => {
  /* chrome.storage.sync.get({ count: 0 } as IOptions, ({ count }: IOptions) => {
      console.log(count);
  }); */
});

chrome.webNavigation.onCompleted.addListener(frame => {
  // extension-specific styles
  chrome.scripting.insertCSS({
    target: { tabId: frame.tabId },
    files: ["build/content_script.css"]
  });

  // page augmentations before insert a extension's content-script
  chrome.scripting.insertCSS({
    target: { tabId: frame.tabId },
    css: ".repos-pr-details-page{position:relative;}"
  });

  // logic that will handle buttons rendering
  chrome.scripting.executeScript({
    target: { tabId: frame.tabId },
    files: ["build/content_script.js"]
  });
}, { url: [{ urlMatches: "https?:\/\/(dev\.azure\.com){1}[\/\w\d\sA-Za-z0-9-_]*(pullrequest\/[0-9])+" }] });
