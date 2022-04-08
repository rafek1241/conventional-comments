
import _ from 'lodash';
import { Writable, writable } from "svelte/store";
import { ConventionalCommentMatch, EmptyMatch, IItem, IOptions } from "./types";
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
    this._value = writable<ConventionalCommentMatch>(this.findLabelAndDecorationsInInput());

    // listen for value changes on input
    this.changeLabelAndDecorationWhenInputMatches();

    //listen for external value changes to align an input text
    this._value.subscribe(newVal => {
      return this.matchTextAreaInputWithSelectedValue(newVal);
    });

    // this._value.subscribe(newVal => console.log(`New value in processor: ${JSON.stringify(newVal)}`));
  }

  private changeLabelAndDecorationWhenInputMatches(): void {
    this._input.addEventListener("input", () => {
      let match = this.findLabelAndDecorationsInInput();
      this._value.update(() => match);
    });
  }


  private matchTextAreaInputWithSelectedValue(value: ConventionalCommentMatch): void {
    let result = this.findLabelAndDecorationsInInput();
    if (_.isEqual(result, value)) {
      return;
    }

    let inputValue = this.getTextToMatch();
    const restOfInput = this._input.value.substring(inputValue.length);
    const valueBeingReplaced = inputValue.match(this._regex);
    const valueToReplaceWith = this.composeLabelAndDecorationsString(value);
    if (_.isEmpty(valueBeingReplaced)) {
      if (inputValue.startsWith(" ") == false) {
        inputValue = " " + inputValue;
      }
      inputValue = `${valueToReplaceWith}${inputValue}${restOfInput}`;
    } else {
      inputValue = inputValue.replace(valueBeingReplaced[0], valueToReplaceWith);
      inputValue += restOfInput;
    }

    triggerInputChangeIfNeeded(this._input, inputValue);
  }

  private composeLabelAndDecorationsString(match: ConventionalCommentMatch): string {
    let label = match.label?.value ?? "";
    let decorations = match.decorations.map(d => d.value).join(',');
    if (decorations.length > 0) {
      decorations = ` (${decorations})`;
    }

    if (_.isEmpty(label) && _.isEmpty(decorations)) {
      return "";
    }

    return `**${label}${decorations}:**`;
  }

  private findLabelAndDecorationsInInput(): ConventionalCommentMatch | null {
    const textToMatch = this.getTextToMatch();
    const result = textToMatch.match(this._regex);

    if (result?.groups != null) {
      let label = this.findLabel(result.groups?.label);
      let decorations = this.findDecorations(result.groups?.decorations?.replace(/[\(\)]/g, '')?.split(',') ?? []);
      return { label, decorations };
    } else {
      return EmptyMatch();
    }
  }

  private getTextToMatch(): string {
    let textToWatch = this._input.value;

    let firstEndOfLine = this._input.value.indexOf("\n");
    if (firstEndOfLine != -1) {
      textToWatch = this._input.value.substring(0, firstEndOfLine);
    }

    return textToWatch;
  }

  private findDecorations(values: string[]): IItem[] {
    return this._options.decorations.filter(decoration => values.includes(decoration.value));
  }
  private findLabel(value: string): IItem {
    return this._options.labels.find(label => label.value === value);
  }
}
