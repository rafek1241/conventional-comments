<script lang="ts">
  import * as marked from "marked";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";

  // FOR DEBUG
  const freezeElement = false;

  const dispatch = createEventDispatcher();
  let component;

  export let position = {
    left: 0,
    top: 0,
  };

  export let items = [];
  export let value = "";

  function destroyComponentOnClickOutsideSelectionBox(event: FocusEvent) {
    if (this.contains(event.relatedTarget) == false && freezeElement == false) {
      dispatch("destroy");
    }
  }

  onMount(() => {
    component.focus();
  });

  function selectItem(row) {
    dispatch("valueChanged", row.value);
  }
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
                class:active={row.value == value}
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
