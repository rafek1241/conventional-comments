import { defaultOptions } from './data';
import { ConventionalCommentProcessor } from './processor';
import App from "./App.svelte";
import Container from "./components/content-script/Container.svelte";

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


        const processor = new ConventionalCommentProcessor(
            container.querySelector("textarea[aria-label=\"Add a comment\"]"),
            defaultOptions
        );

        // inject inputs
        const el = new Container({
            target: container,
            anchor: container.firstElementChild,
            props: {
                processor: processor
            }
        });
    });
});


function waitForElement(selector, continuousObserving = false, callback) {

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

            if (continuousObserving == false) {
                observer.disconnect();
            }
        }

    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}