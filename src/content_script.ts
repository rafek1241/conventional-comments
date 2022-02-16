import App from "./App.svelte";
import ButtonsContainer from "./components/content-script/ButtonsContainer.svelte";

waitForElement("textarea[aria-label=\"Add a comment\"]", true, (matches: Node[]) => {
    console.log("textarea appeared!");
    matches.forEach(async (value: Element) => {
        const container = <HTMLDivElement>value.querySelector(".repos-comment-editor-fit");
        if (container == null) {
            return;
        }

        // inject tailwind
        const app = new App({
            target: document.body
        });

        // inject inputs
        const el = new ButtonsContainer({
            target: container,
            anchor: container.firstChild,
            props: {
                textArea: container.querySelector("textarea[aria-label=\"Add a comment\"]"),
                selectionRenderContainer: document.querySelector(".repos-pr-details-page")
            }
        });
    });
});


function waitForElement(selector, continuosObserving = false, callback) {

    let observer = new MutationObserver(mutations => {
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