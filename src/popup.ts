import Options from "./components/settings/Options.svelte";
import type { IOptions } from "./types";
import App from "./App.svelte";
import Popup from "./components/settings/Popup.svelte";

const app = new App({
    target: document.body
});

new Popup({
    target: document.body
})

// chrome.storage.sync.get({ count: 0 } as Options, ({ count }: Options) => {
//     const options = new Options({
//         target: document.body,
//         props: { count },
//     });
// });
