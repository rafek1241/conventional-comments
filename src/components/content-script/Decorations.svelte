<script lang="ts">
  import type { IItem } from "../../types";
  import Selection from "./Selection.svelte";

  export let value: IItem[];

  let defaultLabel = "Select decorations";

  //items to select from
  export let items: IItem[];

  export let isIconInLabel = true;
  export let defaultLabelIconClass = "ms-Icon--ChevronDownMed";
  export let selectedLabelIconClass = "ms-Icon--ChevronUpMed";

  let selected = false;

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
        value: value,
      },
    });

    selection.$on("valueChanged", (ev) => {
      valueChanged(ev);
    });
    selection.$on("destroy", () => destroySelection(selection));
  }

  const valueChanged = (ev: CustomEvent<IItem[]>) => {
    value = ev.detail;
  };

  const destroySelection = (component: Selection) => {
    component.$destroy();
    selected = false;
  };

  $: description =
    value?.length > 0 ? value.map((x) => x.label).join(", ") : defaultLabel;
</script>

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
