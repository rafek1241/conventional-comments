///<reference types="chrome"/>

console.log('hello world from bg')
chrome.tabs.onUpdated.addListener((_, changed, tab) => {
    console.log(JSON.stringify(changed));
    
    if (changed.status == "loading") {
        console.log(tab.url);

        //TODO: it's one of many 
        if(tab.url.match("https?:\/\/(dev\.azure\.com){1}[\/\w\d\sA-Za-z0-9-_]*(pullrequest\/[0-9])+")){
            console.log("hello in azdo! Trying to inject content-script!");
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['js/contentScript.js']
              });
        }
    }
});