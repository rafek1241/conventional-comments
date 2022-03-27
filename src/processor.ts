import { Writable, writable } from "svelte/store";
import { ConventionalCommentMatch, EmptyMatch, IOptions } from "./types";
import { triggerInputChange as triggerInputChangeIfNeeded } from './utils';

export class ConventionalCommentProcessor {
  get value(): Writable<ConventionalCommentMatch> {
    return this._value;
  }
  get input(): HTMLTextAreaElement | HTMLInputElement {
    return this._input;
  }

  private _input: HTMLTextAreaElement | HTMLInputElement;
  private _options: IOptions;
  private _regex: RegExp = /^\*{0,2}(?<label>[\w]+)[\s]?(?<decorations>\([\w\s\,\-]+\))?(:\*{0,2})/;
  private readonly _value: Writable<ConventionalCommentMatch>;

  constructor(input: HTMLTextAreaElement | HTMLInputElement, options: IOptions) {
    this._input = input;
    this._options = options;
    this._value = writable<ConventionalCommentMatch>(EmptyMatch());

    // listen for value changes on input
    this.changeLabelAndDecorationWhenInputMatches();

    //listen for external value changes to align an input text
    this._value.subscribe(newVal => {
      return this.matchTextAreaInputWithSelectedValue(newVal);
    });
    this._value.subscribe(newVal => console.log(`New value in processor: ${JSON.stringify(newVal)}`));
  }

  private changeLabelAndDecorationWhenInputMatches(): void {
    this._input.addEventListener("input", () => {
      let regexResult = this.findLabelAndDecorationsInInput();
      if (regexResult?.groups != null) {
        let selectedDecorations = this._options.decorations
          .filter(item => Array.from(regexResult.groups.decorations ?? []).includes(item.value));
        let selectedLabel = this._options.labels
          .find(x => x.value === regexResult.groups.label ?? "");

        let newValue: ConventionalCommentMatch = {
          label: selectedLabel,
          decorations: selectedDecorations
        };
        this._value.update(_ => newValue);
      } else {
        this._value.update(_ => EmptyMatch());
      }
    });
  }


  private matchTextAreaInputWithSelectedValue(value: ConventionalCommentMatch): void {
    let result = this.findLabelAndDecorationsInInput();

    let labelInInput = result?.groups?.label ?? "";
    let isIncomingLabelDifferentThanInInput = !!value?.label?.value && labelInInput != value?.label?.value;

    let foundDecorationsInInput = Array.from(result?.groups?.decorations ?? []);
    let newDecors = value?.decorations?.map(newDecor => newDecor.value) ?? [];
    let isAnyDecorationDifferent = foundDecorationsInInput
      .filter(inputDecor => newDecors.includes(inputDecor) == false)
      .length > 0;

    let input = this._input.value;
    if (isIncomingLabelDifferentThanInInput || isAnyDecorationDifferent) {
      if (labelInInput.length > 0 || isIncomingLabelDifferentThanInInput) {
        let startPosition = input.indexOf(labelInInput);
        let endPosition = startPosition + labelInInput.length;
        let newLabel = value?.label?.value;

        if (newLabel == null) {
          input = input.substring(endPosition + ":".length);
        } else {
          input = input.substring(0, startPosition) + newLabel + input.substring(endPosition);
        }

        if (endPosition == 0 && input.length > 0) {
          input = input + ":";
        }
      }

      if (foundDecorationsInInput.length > 0) {
        let startPosition = input.indexOf(foundDecorationsInInput[0]);
        let lastDecoration = foundDecorationsInInput[foundDecorationsInInput.length - 1];
        let endPosition = input.indexOf(lastDecoration) + lastDecoration.length;
        let decorsString = newDecors.join(",");

        input = input.substring(0, startPosition) + decorsString + input.substring(endPosition);
      }

      triggerInputChangeIfNeeded(this._input, input);
    }
  }

  private findLabelAndDecorationsInInput(): RegExpMatchArray | null {
    let textToWatch = this._input.value;

    let firstEndOfLine = this._input.value.indexOf("\n");
    if (firstEndOfLine != -1) {
      textToWatch = this._input.value.substring(0, firstEndOfLine);
    }

    return textToWatch.match(this._regex);
  }
}

