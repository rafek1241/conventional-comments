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
  export let settings: any;

  let multipleSelection = Array.isArray(value);

  onMount(() => {
    component.focus();
  });

  const destroyComponentOnClickOutsideSelectionBox = (event: FocusEvent) => {
    if (
      event.relatedTarget == null ||
      !component.contains(event.relatedTarget as Node)
    ) {
      dispatcher("destroy");
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
  class="{settings.selectors.table} selection-container"
  style="left: {position.left}px;top: {position.top}px"
  on:focusout={destroyComponentOnClickOutsideSelectionBox}
  on:keydown={(e) => e.key == "Escape" && dispatcher("destroy")}
  bind:this={component}
  role="dialog"
  tabindex="-1">
  <div class="">
    <div class="" tabindex="-1">
      <div class="p-1" />
      <table class="relative scroll-hidden">
        <tbody class="relative" role="presentation">
          {#if items.length === 0}
            <tr><td class="justify-center px-3">There are no items</td></tr>
          {:else}
            {#each items as row}
              <tr
                class="{settings.selectors.row} cursor-pointer"
                class:active={isActiveRow(row)}
                on:click={() => selectItem(row)}
                on:keydown={(e) => e.key == "Enter" && selectItem(row)}
                tabindex="0">
                <!-- icon -->
                <td class="{settings.selectors.cell} left-icon align-middle">
                  <span class="flex-shrink-0">
                    <i class="ri-{row.icon}-line ri-xl" />
                  </span>
                </td>
                <!-- value -->
                <td class={settings.selectors.cell}>
                  <div class="flex-col flex">
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
      <div class="p-1" />
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
  td.left-icon {
    padding: 0.5rem;
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
