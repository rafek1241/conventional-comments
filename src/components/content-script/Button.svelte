<script lang="ts">
  import type { ButtonSettings, Components, IItem } from "../../types";
  import { createEventDispatcher } from "svelte";
  import Selection from "./Selection.svelte";

  export let value = null;
  export let items: IItem[];
  export let componentSettings: Components;
  const settings: ButtonSettings = componentSettings.button;
  export let disabled: boolean = false;
  export let placeholder = "Select...";
  let selected: boolean = false;
  let button: HTMLButtonElement;
  const dispatcher = createEventDispatcher();

  function renderSelection(event: MouseEvent): void {
    if (selected) {
      return;
    }

    const selectionSettings = componentSettings.selection;
    const cssSelector = selectionSettings.selectors.render;
    selected = !selected;
    let parent = document.querySelector(cssSelector);
    let target = <Element>event.currentTarget;
    let parentRect = parent.getBoundingClientRect();
    let targetRect = target.getBoundingClientRect();

    const selection = new Selection({
      target: document.querySelector(cssSelector),
      props: {
        position: {
          left:
            targetRect.left - parentRect.left + selectionSettings.position.left,
          top:
            targetRect.top +
            parent.scrollTop +
            targetRect.height +
            selectionSettings.position.top,
        },
        items: items,
        value: value,
        settings: componentSettings.selection,
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
    button.focus();
  };

  $: valueString = Array.isArray(value)
    ? value?.length > 0
      ? value.map((x) => x.label).join(", ")
      : null
    : value?.label;
</script>

<button
  class={settings.classes}
  class:active={selected}
  class:disabled
  {disabled}
  on:click={renderSelection}
  bind:this={button}>
  <!-- description -->
  <div class={settings.placeholderClasses}>
    {valueString || placeholder}
  </div>
  <!-- icon -->
  {#if settings.icon.enabled}
    <span
      class="{selected
        ? settings.icon?.selected ?? settings.icon.default
        : settings.icon.default} {settings.icon.classes}" />
  {/if}
</button>
