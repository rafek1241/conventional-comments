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
    const storage: IOptions = {
      count,
    };

    chrome.storage.sync.set(storage, () => {
      successMessage = "Options saved!";

      setTimeout(() => {
        successMessage = null;
      }, 1500);
    });
  }
</script>

<div class="container max-w-lg">
  <p>Current count: <b>{count}</b></p>
  <div>
    <button on:click={decrement}>-</button>
    <button on:click={increment}>+</button>
    <button on:click={save}>Save</button>
    {#if successMessage}<span class="success">{successMessage}</span>{/if}
  </div>
  Hehe
</div>

<style>
  .container {
    min-width: 200px;
  }
</style>
