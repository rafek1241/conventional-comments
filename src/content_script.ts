import { defaultOptions } from './data';
import { ConventionalCommentProcessor } from './processor';
import App from "./App.svelte";
import Container from "./components/content-script/Container.svelte";

//Element that we want to find
const selector = "textarea[aria-label=\"Add a comment\"]";
//Parent elements that defines where the comment box is, not the reply.
const greenAreaSelectors = [".bolt-timeline-first-row", ".repos-discussion-thread > div:first-child"];

waitForElement(selector, (matches: Node[]) => {

    // get all green area nodes from DOM
    const greenAreas = document.querySelectorAll(greenAreaSelectors.join(','));

    matches.forEach((value: Element) => {
        const container = <HTMLDivElement>value.querySelector(".repos-comment-editor-fit");
        const isItInCorrectArea = Array.from(greenAreas).find(x => x.contains(container)) != null;

        if (container == null || isItInCorrectArea == false) {
            return;
        }

        // inject tailwind
        const app = new App({
            target: document.body
        });


        const processor = new ConventionalCommentProcessor(
            container.querySelector(selector),
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


function waitForElement(selector, callback): void {

    let observer = new MutationObserver(mutations => {
        const matches = mutations
            .flatMap(x => Array.from(x.addedNodes))
            .filter(x => x.nodeType === 1)
            .filter((value: Element) => value.querySelector(selector));

        const uniqueMatches = excludeNodesThatAreAlreadyCovered(matches);

        if (uniqueMatches.length > 0) {
            callback(uniqueMatches);
        }

    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// if nodes are nested, we need to exclude them
function excludeNodesThatAreAlreadyCovered(matches: Node[]): Node[] {
    var result: Node[] = [];
    matches.forEach(match => {
        if (result.find(x => x.contains(match)) == null) {
            result.push(match);
        }
    });

    return result;
}
