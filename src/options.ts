import Options from "./components/settings/Options.svelte";
import App from "./App.svelte";
import type { IOptions } from "./types";

const app = new App({
    target: document.body
});

function restoreOptions() {
    // chrome.storage.sync.get({ count: 0 } as Options, ({ count }: Options) => {
    //     const app = new Options({
    //         target: document.body,
    //         props: { count },
    //     });
    // });
    const app = new Options({
        target: document.body
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
