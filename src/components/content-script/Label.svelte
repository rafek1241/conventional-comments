<script lang="ts">
  import { onMount } from "svelte";

  import type { IItem } from "../../types";

  import Selection from "./Selection.svelte";

  export let value: IItem;
  export let label: string;
  export let items: IItem[];
  export let input: HTMLTextAreaElement | HTMLInputElement;
  export let selected: boolean = false;
  export let isIconInLabel = true;
  export let defaultLabelIconClass = "ms-Icon--ChevronDownMed";
  export let selectedLabelIconClass = "ms-Icon--ChevronUpMed";

  // styling
  export let additionalButtonClasses =
    "bolt-button bolt-expandable-button bolt-focus-treatment";
  export let additionalPlaceholderClasses =
    "bolt-dropdown-expandable-button-label justify-start flex-grow text-ellipsis";
  export let additionalIconClasses =
    "icon-right font-weight-normal flex-noshrink fabric-icon small";

  function renderSelection(event: MouseEvent): void {
    if (selected) {
      return;
    }

    const cssSelector = ".repos-pr-details-page";
    selected = !selected;
    let parent = document.querySelector(cssSelector);
    let target = <Element>event.currentTarget;
    let parentRect = parent.getBoundingClientRect();
    let targetRect = target.getBoundingClientRect();

    const selection = new Selection({
      target: document.querySelector(cssSelector),
      props: {
        position: {
          left: targetRect.left - parentRect.left,
          top: targetRect.top + parent.scrollTop + targetRect.height - 48,
        },
        items: items,
        item: value ?? null,
      },
    });

    selection.$on("destroy", destroySelection);
    selection.$on("valueChanged", (ev: CustomEvent<string>) => {
      value = items.find((y) => y.value === ev.detail);
      destroySelection();
    });

    function destroySelection() {
      selection.$destroy();
      selected = false;
    }
  }

  $: description = value?.label ?? label;
</script>

<!-- on:click={(e) => renderList(e, labels, dropdowns[0])} -->
<button
  class={additionalButtonClasses}
  class:active={selected}
  on:click={renderSelection}>
  <!-- description -->
  <div class={additionalPlaceholderClasses}>
    {description}
  </div>
  <!-- icon -->
  {#if isIconInLabel}
    <span
      class="{selected
        ? selectedLabelIconClass
        : defaultLabelIconClass} {additionalIconClasses}" />
  {/if}
</button>
