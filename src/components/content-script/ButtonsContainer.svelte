<script lang="ts">
  import { defaultOptions } from "../../data";
  import Button from "./Button.svelte";

  export let options = defaultOptions;

  let regex =
    /^\*{0,2}([\w]+){0,1}[\s]{0,1}(\([\w\s\,\-]+\)){0,1}(:\*{0,2}){0,1}/;

  export let textArea: HTMLTextAreaElement;
  export let selectionRenderContainer: HTMLDivElement;

  textArea.addEventListener("input", () => {
    let areaValue = textArea.value.substring(0, 250);
    let labelRegexResult = areaValue.match(regex);

    console.log(JSON.stringify(decorationValues));
    console.log("Regex result: " + JSON.stringify(labelRegexResult));

    labelValue = "";
    decorationValues = [];

    if (options.labels.find((x) => x.value == labelRegexResult[1])) {
      labelValue = labelRegexResult[1];
    }

    if (labelRegexResult[2] != null) {
      let decorationsFromRegex = labelRegexResult[2]
        .substring(1, labelRegexResult[2].length - 1)
        .split(",")
        .map((y) => y.trim())
        .filter((item) => options.decorations.find((y) => y.value == item));

      decorationValues = decorationsFromRegex;
    }
  });

  export let labelValue = "";
  export let decorationValues = [];
  $: dropdowns = [
    { selected: false, value: labelValue },
    { selected: false, value: decorationValues },
  ];
</script>

<div class="flex mb-2 items-center">
  <Button label="Select label" items={options.labels} bind:value={labelValue} />
  <!-- <Button
    label="Select decoration"
    items={options.decorations}
    bind:value={decorationValues} /> -->
</div>

<style>
  .items-center button:not(:last-child) {
    margin-right: 0.5rem;
  }
</style>
