/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, Element, State, Watch, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'og-radio-button-group',
  styleUrl: 'og-radio-button-group.scss',
  shadow: true
})
export class OgRadioButtonGroup {
  @Element()
  public el: HTMLElement;

  @State()
  public radioButtons: HTMLOgRadioButtonElement[] = [];

  /**
   * name for the radio buttons within this group
   */
  @Prop()
  public name: string;

  /**
   * The value of the selected radio button.
   */
  @Prop({ reflectToAttr: true, mutable: true })
  public value: string;

  /**
   * Determines, whether the control is disabled or not
   */
  @Prop()
  public disabled: boolean;

  @Event()
  public valueChanged: EventEmitter<string>;

  @Watch('name')
  public nameChanged() { this.updateButtons(); }

  @Watch('value')
  public handleValueChange() { this.updateButtons(); }

  @Watch('disabled')
  public disabledChanged() { this.updateButtons(); }

  public componentWillLoad() {
    // Grab radio buttons from this component
    this.radioButtons = Array.from(this.el.querySelectorAll('og-radio-button'));
    if (this.radioButtons.length === 0) {
      throw new Error('[og-radio-button-group] Must have at least one og-radio-button child');
    }
    this.updateButtons();
    this.radioButtons.forEach(radioButton => {
      radioButton.addEventListener('changed', e => this.selectedRadioButtonChanged(e));
    });
  }

  public selectedRadioButtonChanged(event) {
    this.value = event.target.value;
    this.valueChanged.emit(this.value);
    event.cancelBubble = true;
  }

  public updateButtons() {
    this.radioButtons.forEach(button => {
      button.name = this.name;
      button.groupDisabled = this.disabled;
      button.checked = button.value === this.value;
    })
  }

  public render(): HTMLElement {
    return (
      <slot></slot>
    );
  }
}
