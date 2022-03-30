<script lang="ts">
  import { marked } from "marked";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import type { IItem } from "../../types";

  const dispatcher = createEventDispatcher();
  let component: HTMLDivElement;

  export let position = {
    left: 0,
    top: 0,
  };

  export let items: IItem[] = [];
  export let value: IItem | IItem[];

  let multipleSelection = value instanceof Array;

  onMount(() => {
    component.focus();
  });

  onDestroy(() => {});

  const destroyComponentOnClickOutsideSelectionBox = (event: FocusEvent) => {
    if (
      event.relatedTarget == null ||
      !component.contains(event.relatedTarget as Node)
    ) {
      dispatcher("destroy");
    } else {
      component.focus();
    }
  };

  $: isActiveRow = (row: IItem): Boolean => {
    if (multipleSelection) {
      return (value as IItem[]).some((y) => y.value == row.value);
    } else {
      return (value as IItem)?.value == row.value;
    }
  };

  const selectItem = (row: IItem) => {
    if (isActiveRow(row) && multipleSelection) {
      value = (value as IItem[]).filter((item) => item.value != row.value);
    } else {
      if (multipleSelection) {
        value = [...(value as IItem[]), row];
      } else {
        value = row;
      }
    }

    dispatcher("valueChanged", value);
  };
</script>

<div
  class="bolt-contextual-menu flex-column custom-scrollbar depth-8 bolt-callout-content bolt-callout-shadow selection-container"
  style="left: {position.left}px;top: {position.top}px"
  bind:this={component}
  on:focusout={destroyComponentOnClickOutsideSelectionBox}
  role="dialog"
  tabindex="-1">
  <div class="bolt-contextualmenu-container">
    <div class="bolt-menu-container no-outline" tabindex="-1">
      <div class="bolt-menu-spacer" />
      <table class="bolt-menu bolt-list body-m relative scroll-hidden">
        <tbody class="relative" role="presentation">
          {#if items.length === 0}
            <tr><td class="justify-center px-3">There are no items</td></tr>
          {:else}
            {#each items as row}
              <tr
                class="bolt-menuitem-row bolt-list-row bolt-menuitem-row-normal bolt-button cursor-pointer"
                class:active={isActiveRow(row)}
                on:click={() => selectItem(row)}>
                <!-- icon -->
                <td class="bolt-menuitem-cell bolt-list-cell left-icon">
                  <div
                    class="bolt-menuitem-cell-content bolt-menuitem-cell-icon flex-row">
                    <span class="flex-noshrink">
                      <i class="ri-{row.icon}-line ri-xl" />
                    </span>
                  </div>
                </td>
                <!-- value -->
                <td class="bolt-menuitem-cell bolt-list-cell">
                  <div class="bolt-menuitem-cell-content flex-col flex">
                    <p class="label">{row.label}</p>
                    <p class="description">
                      {@html marked.parse(row.description)}
                    </p>
                  </div>
                </td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
      <div class="bolt-menu-spacer" />
    </div>
  </div>
</div>

<style>
  .selection-container {
    position: absolute;
    max-height: 500px;
    max-width: 40rem;
    z-index: 1000001;
  }

  p.label {
    font-weight: bold;
  }

  p.label::first-letter {
    text-transform: capitalize;
  }

  p.description {
    word-wrap: break-word;
    white-space: normal;
    font-weight: normal;
  }
</style>
