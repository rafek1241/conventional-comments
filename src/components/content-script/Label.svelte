<script lang="ts">
  import type { IItem, Site } from "../../types";
  import Selection from "./Selection.svelte";

  export let value: IItem;

  let defaultLabel = "Select label";
  let button: HTMLButtonElement;

  export let items: IItem[];
  export let selected: boolean = false;
  export let isIconInLabel = true;

  export let site: Site;
  const componentName = "Label";
  let componentSettings = site.components.find((x) => x.name == componentName);
  let additionalButtonClasses = componentSettings.classes;
  let additionalPlaceholderClasses = componentSettings.placeholderClasses;
  let additionalIconClasses = componentSettings.additionalIconClasses;
  let defaultLabelIconClass = componentSettings.defaultIconClass;
  let selectedLabelIconClass = componentSettings.selectedIconClass;

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
      destroySelection(selection);
    });
    selection.$on("destroy", () => destroySelection(selection));
  }

  const valueChanged = (ev: CustomEvent<IItem>) => {
    value = ev.detail;
  };

  const destroySelection = (selection: Selection) => {
    selection.$destroy();
    selected = false;
    button.focus();
  };

  $: description = value?.label ?? defaultLabel;
</script>

<button
  class={additionalButtonClasses}
  class:active={selected}
  on:click={renderSelection}
  bind:this={button}>
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
