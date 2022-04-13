<script lang="ts">
  import { defaultOptions } from "../../data";
  import type { ConventionalCommentProcessor } from "../../processor";
  import type { Site } from "../../types";
  import Decorations from "./Decorations.svelte";
  import Label from "./Label.svelte";

  export let options = defaultOptions;
  export let processor: ConventionalCommentProcessor;
  let value = processor.value;

  export let site: Site;
  const componentName = "Container";
  let componentSettings = site.components.find((x) => x.name == componentName);

  console.log(JSON.stringify(site));
</script>

<div class="items-center {componentSettings.classes}">
  <Label items={options.labels} bind:value={$value.label} {site} />
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
