<script lang="ts">
  import { defaultOptions } from "../../data";
  import type { ConventionalCommentProcessor } from "../../processor";
  import Decorations from "./Decorations.svelte";
  import Label from "./Label.svelte";

  export let options = defaultOptions;
  export let processor: ConventionalCommentProcessor;
  let value = processor.value;
</script>

<div class="flex mb-2 items-center">
  <Label items={options.labels} bind:value={$value.label} />
  <Decorations
    items={options.decorations}
    bind:value={$value.decorations}
    disabled={$value.label == null} />
</div>

<style>
  .items-center :global(button:not(:last-child)) {
    margin-right: 0.5rem;
  }
</style>
