import Options from "./components/Options.svelte";
import App from "./App.svelte";
import type { IOptions } from "./types";

const app = new App({
    target: document.body
});

function restoreOptions() {
    chrome.storage.sync.get({ count: 0 } as IOptions, ({ count }: IOptions) => {
        const app = new Options({
            target: document.body,
            props: { count },
        });
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
