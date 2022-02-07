import Options from "./components/Options.svelte";
import type { IOptions } from "./types";
import App from "./App.svelte";

const app = new App({
    target: document.body
});

chrome.storage.sync.get({ count: 0 } as IOptions, ({ count }: IOptions) => {
    const options = new Options({
        target: document.body,
        props: { count },
    });
});
