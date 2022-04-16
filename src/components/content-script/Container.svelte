<script lang="ts">
  import { defaultOptions } from "../../data";
  import type { ConventionalCommentProcessor } from "../../processor";
  import type { Site } from "../../types";
  import Button from "./Button.svelte";
  export let site: Site;
  const componentSettings = site.components;
  const settings = componentSettings.container;
  export let options = defaultOptions;
  export let processor: ConventionalCommentProcessor;
  let value = processor.value;
</script>

<div class="items-center {settings.classes}">
  <Button
    items={options.labels}
    bind:value={$value.label}
    {componentSettings}
    placeholder="Select a label" />
  <Button
    items={options.decorations}
    bind:value={$value.decorations}
    {componentSettings}
    disabled={$value.label == null}
    placeholder="Select decorations" />
</div>

<style>
  .items-center :global(button:not(:last-child)) {
    margin-right: 0.5rem;
  }
</style>
