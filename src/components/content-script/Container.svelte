<script lang="ts">
  import { defaultOptions } from "../../data";
  import type { ConventionalCommentProcessor } from "../../processor";
  import Label from "./Label.svelte";

  export let options = defaultOptions;
  export let processor: ConventionalCommentProcessor;
  let value = processor.value;
</script>

<div class="flex mb-2 items-center">
  <Label
    label="Select label"
    items={options.labels}
    input={processor.input}
    bind:value={$value.label} />
  <!--  <Button-->
  <!--    label="Select decoration"-->
  <!--    items={options.decorations}-->
  <!--    bind:value={decorationValues} />-->
</div>

<style>
  .items-center button:not(:last-child) {
    margin-right: 0.5rem;
  }
</style>
