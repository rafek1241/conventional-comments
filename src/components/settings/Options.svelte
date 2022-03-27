<script lang="ts">
  import type { IOptions } from "../../types";

  export let count: number;
  let successMessage: string = null;

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  function save() {
    /*   const storage: IOptions = {
      count,
    };

    chrome.storage.sync.set(storage, () => {
      successMessage = "Options saved!";

      setTimeout(() => {
        successMessage = null;
      }, 1500);
    }); */
  }
</script>

<div class="container">
  <h1>Extension made with ❤️ by Robert Szachnowski</h1>
</div>

<style>
  .container {
    min-width: 200px;
    min-height: 200px;
  }
</style>
