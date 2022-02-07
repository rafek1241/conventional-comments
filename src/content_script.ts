import type { IOptions } from "./types";

chrome.storage.sync.get({ count: 0 } as IOptions, ({ count }: IOptions) => {
    console.log(count);
});
