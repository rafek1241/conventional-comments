import Options from "./components/settings/Options.svelte";
import type { IOptions } from "./types";
import App from "./App.svelte";

const app = new App({
    target: document.body
});

// chrome.storage.sync.get({ count: 0 } as Options, ({ count }: Options) => {
//     const options = new Options({
//         target: document.body,
//         props: { count },
//     });
// });
