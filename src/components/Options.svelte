<script lang="ts">
  import type { IOptions } from "../types";

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

<div class="container">
  <p>Current count: <b>{count}</b></p>
  <div>
    <button on:click={decrement}>-</button>
    <button on:click={increment}>+</button>
    <button on:click={save}>Save</button>
    {#if successMessage}<span class="success">{successMessage}</span>{/if}
  </div>
</div>
<div class="md:flex">
  <div class="md:flex-shrink-0">
    <img
      class="rounded-lg md:w-56"
      src="/img/shopping.jpg"
      alt="Woman paying for a purchase"
    />
  </div>
  <div class="mt-4 md:mt-0 md:ml-6">
    <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">
      Marketing
    </div>
    <a
      href="/get-started"
      class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
    >
      Finding customers for your new business
    </a>
    <p class="mt-2 text-gray-600">
      Getting a new business off the ground is a lot of hard work. Here are five
      ideas you can use to find your first customers.
    </p>
  </div>
</div>

<style>
  .container {
    min-width: 250px;
  }

  button {
    border-radius: 2px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
    background-color: #2ecc71;
    color: #ecf0f1;
    transition: background-color 0.3s;
    padding: 5px 10px;
    border: none;
  }

  button:hover,
  button:focus {
    background-color: #27ae60;
  }

  .success {
    color: #2ecc71;
    font-weight: bold;
  }
</style>
