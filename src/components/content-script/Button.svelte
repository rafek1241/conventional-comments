<script lang="ts">
  import type { IItem } from "../../types";
  import Selection from "./Selection.svelte";

  // props
  export let value: string;
  export let label: string;
  export let items: IItem[];
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

    selected = !selected;
    let parent = document.querySelector(".repos-pr-details-page");
    let target = <Element>event.currentTarget;
    let parentRect = parent.getBoundingClientRect();
    let targetRect = target.getBoundingClientRect();
    console.log(JSON.stringify(targetRect));

    const selection = new Selection({
      target: document.querySelector(".repos-pr-details-page"),
      props: {
        position: {
          left: targetRect.left - parentRect.left,
          top: targetRect.top + targetRect.height - parentRect.top,
        },
        items: items,
        value: value,
      },
    });

    selection.$on("valueChanged", (ev: CustomEvent<string>) => {
      value = ev.detail;
      selection.$destroy();
      selected = false;
    });

    selection.$on("destroy", (ev) => {
      selection.$destroy();
      selected = false;
    });
  }
</script>

<!-- on:click={(e) => renderList(e, labels, dropdowns[0])} -->
<button
  class={additionalButtonClasses}
  class:active={selected}
  on:click={renderSelection}>
  <!-- description -->
  <div class={additionalPlaceholderClasses}>
    {value ? value : label}
  </div>
  <!-- icon -->
  {#if isIconInLabel}
    <span
      class="{selected
        ? selectedLabelIconClass
        : defaultLabelIconClass} {additionalIconClasses}" />
  {/if}
</button>
