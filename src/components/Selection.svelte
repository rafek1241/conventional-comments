<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let position = {
    left: 0,
    top: 0,
  };

  export let items = [];
  let isSelectionHovered = false;

  function markThatMouseIsInSelection(): void {
    isSelectionHovered = true;
  }

  function destroyElement(): void {
    if (isSelectionHovered) {
      dispatch("destroy");
    }
  }
</script>

<div
  class="bolt-contextual-menu flex-column custom-scrollbar depth-8 bolt-callout-content bolt-callout-shadow selection-container"
  style="left: {position.left}px;top: {position.top}px"
  on:mouseenter={markThatMouseIsInSelection}
  on:mouseleave={destroyElement}
  role="dialog">
  <div class="bolt-contextualmenu-container">
    <div class="bolt-menu-container no-outline" tabindex="-1">
      <div class="bolt-menu-spacer" />
      <table class="bolt-menu bolt-list body-m relative scroll-hidden">
        <tbody class="relative" role="presentation">
          {#if items.length === 0}
            <tr><td>There are no items</td></tr>
          {:else}
            {#each items as row}
              <tr
                class="bolt-menuitem-row bolt-list-row bolt-menuitem-row-normal cursor-pointer">
                <!-- icon -->
                <td class=" bolt-menuitem-cell bolt-list-cell">
                  <div
                    class="bolt-menuitem-cell-content bolt-menuitem-cell-icon flex-row">
                    <span
                      aria-hidden="true"
                      class="flex-noshrink fabric-icon ms-Icon--BranchMerge" />
                  </div>
                </td>
                <!-- value -->
                <td class="bolt-menuitem-cell bolt-list-cell">
                  <div class="bolt-menuitem-cell-content flex-col flex">
                    <p class="label">{row.label}</p>
                    <p class="description">
                      {row.description}
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
  }
</style>
