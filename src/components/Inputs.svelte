<script lang="ts">
  import Selection from "./Selection.svelte";

  const labels = [
    {
      value: "praise",
      label: "praise",
      description:
        "Praises highlight something positive. Try to leave at least one of these comments per review. _Do not_ leave false praise (which can actually be damaging). _Do_ look for something to sincerely praise.",
    },
    {
      value: "nitpick",
      label: "nitpick",
      description:
        "Nitpicks are small, trivial, but necessary changes. Distinguishing nitpick comments significantly helps direct the reader's attention to comments requiring more involvement.",
    },
    {
      value: "suggestion",
      label: "suggestion",
      description:
        "Suggestions propose improvements to the current subject. It's important to be explicit and clear on _what_ is being suggested and _why_ it is an improvement. Consider using patches and the _blocking_ or _non-blocking_ decorations to further communicate your intent.",
    },
    {
      value: "issue",
      label: "issue",
      description:
        "Issues highlight specific problems with the subject under review. These problems can be user-facing or behind the scenes. It is strongly recommended to pair this comment with a `suggestion`. If you are not sure if a problem exists or not, consider leaving a `question`.",
    },
    {
      value: "question",
      label: "question",
      description:
        "Questions are appropriate if you have a potential concern but are not quite sure if it's relevant or not. Asking the author for clarification or investigation can lead to a quick resolution.",
    },
    {
      value: "thought",
      label: "thought",
      description:
        "Thoughts represent an idea that popped up from reviewing. These comments are non-blocking by nature, but they are extremely valuable and can lead to more focused initiatives and mentoring opportunities.",
    },
    {
      value: "chore",
      label: "chore",
      description:
        'Chores are simple tasks that must be done before the subject can be "officially" accepted. Usually, these comments reference some common process. Try to leave a link to the process description so that the reader knows how to resolve the chore.',
    },
  ];

  const decorations = [
    {
      value: "non-blocking",
      label: "non-blocking",
      description:
        "A comment with this decoration **should not** prevent the subject under review from being accepted. This is helpful for organizations that consider comments blocking by default.",
    },
    {
      value: "blocking",
      label: "blocking",
      description:
        "A comment with this decoration **should** prevent the subject under review from being accepted, until it is resolved. This is helpful for organizations that consider comments non-blocking by default.",
    },
    {
      value: "if-minor",
      label: "if-minor",
      description:
        "This decoration gives some freedom to the author that they should resolve the comment only if the changes ends up being minor or trivial.",
    },
  ];

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

    if (labels.find((x) => x.value == labelRegexResult[1])) {
      labelValue = labelRegexResult[1];
    }

    if (labelRegexResult[2] != null) {
      let decorationsFromRegex = labelRegexResult[2]
        .substring(1, labelRegexResult[2].length - 1)
        .split(",")
        .map((y) => y.trim())
        .filter((item) => decorations.find((y) => y.value == item));

      decorationValues = decorationsFromRegex;
    }
  });

  function renderList(
    event: MouseEvent,
    items: { value: string; label: string; description: string }[],
    buttonSettings: { selected: boolean }
  ): void {
    if (buttonSettings.selected) {
      return;
    }

    buttonSettings.selected = !buttonSettings.selected;
    let parent = selectionRenderContainer;
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
      },
    });
        
    selection.$on("destroy", (ev) => {
      selection.$destroy();
      buttonSettings.selected = false;
    });
  }

  let dropdowns = [{ selected: false }, { selected: false }];
  export let labelValue = "";
  export let decorationValues = [];
</script>

<!-- <div class="bolt-textfield flex-row flex-center focus-treatment"> -->
<div class="flex mb-2 items-center">
  <!-- Select label -->
  <button
    class="bolt-button bolt-expandable-button bolt-focus-treatment"
    on:click={(e) => renderList(e, labels, dropdowns[0])}
    class:active={labelValue.length > 0 || dropdowns[0].selected}>
    <div
      class="bolt-dropdown-expandable-button-label justify-start flex-grow text-ellipsis">
      {labelValue ? labelValue : "Select label"}
    </div>
    <span
      class:ms-Icon--ChevronDownMed={!dropdowns[0].selected}
      class:ms-Icon--ChevronUpMed={dropdowns[0].selected}
      class="icon-right font-weight-normal flex-noshrink fabric-icon small" />
  </button>

  <!-- TODO: fix it -->
  <!-- Select decoration -->
  <button
    class="bolt-button bolt-expandable-button bolt-focus-treatment"
    on:click={(e) => renderList(e, decorationValues, dropdowns[1])}
    class:active={decorationValues.length > 0 || dropdowns[1].selected}>
    <div class="bolt-dropdown-expandable-button-label justify-start flex-grow">
      {decorationValues.length > 0
        ? Array.from(decorationValues).join(", ")
        : "Select decoration"}
    </div>
    <span
      aria-hidden="true"
      class:ms-Icon--ChevronDownMed={!dropdowns[1].selected}
      class:ms-Icon--ChevronUpMed={dropdowns[1].selected}
      class="icon-right font-weight-normal flex-noshrink fabric-icon small" />
  </button>
</div>

<style>
  .items-center button:not(:last-child) {
    margin-right: 0.5rem;
  }
</style>
