export { }
var labels, decorations, template;
fetch(chrome.runtime.getURL('data/labels.json'))
    .then(val => val.json())
    .then(val => labels = val);
fetch(chrome.runtime.getURL('data/decorations.json'))
    .then(val => val.json())
    .then(val => decorations = val);
fetch(chrome.runtime.getURL("template.html"))
    .then(val => val.text())
    .then(val => template = val);

waitForElement('textarea[aria-label="Add a comment"]', true, (matches: Node[]) => {
    console.log('textarea appeared!');
    matches.forEach(async (value: Element) => {
        const container = value.querySelector('.repos-comment-editor-fit');
        if (container == null) {
            return;
        }

        var el = htmlToElement(template);
        if (container.querySelector('#cnv-cmnts-container') != null) {
            return;
        }
        container.prepend(el);
    });
});


function waitForElement(selector, continuosObserving = false, callback) {

    console.log("attaching observer");
    const observer = new MutationObserver(mutations => {
        if (mutations.flatMap(x => Array.from(x.addedNodes)).map(y => y.textContent).filter(x => x.includes("Comment")).length > 0) {
            console.log("contains comment");

        }
        const filteredNodes = mutations
            .flatMap(x => Array.from(x.addedNodes))
            .filter(x => x.nodeType === 1);

        const matches = filteredNodes.filter((value: Element) => value.querySelector(selector));

        if (matches.length > 0) {
            console.log(matches);
            callback(matches);

            if (continuosObserving == false) {
                observer.disconnect();
            }
        }

    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html: string) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}