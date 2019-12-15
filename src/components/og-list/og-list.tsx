/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, Element, EventEmitter, Event, Watch, State } from '@stencil/core';

@Component({
  tag: 'og-list',
  styleUrl: 'og-list.scss',
  shadow: true
})
export class OgList {

  @Element()
  public hostElement: HTMLElement;

  public listContainer: HTMLElement;

  /**
   *
   * Key(s) of the selected list item(s)
   * @type {(string | string[])}
   * @memberof OgListTemplate
   */
  @Prop({ mutable: true, reflect: true })
  public selected: string | string[];

  @Watch('selected')
  public handleSelectedPropChanged(newValue: string | string[]) {
    if (this.multiselect) {
      // try to parse html encoded string to array
      if (typeof newValue === 'string') {
        newValue = JSON.parse(newValue);
      }
      this.internalSelection = new Set(newValue as string[]);
    } else {
      this.internalSelection = new Set([newValue as string]);
    }
  }

  /**
   * An array of items to choose from
   */
  @Prop()
  public items: any[];

  @Prop()
  public template: string = 'default';

  @Prop({mutable: true})
  public templateOptions: any = { key: 'key', label: 'label', disabled: 'disabled' };

  /**
 * Set the text that will be displayed if the items array is empty.
 */
  @Prop()
  public emptyListMessage: string = 'No items available';

  /**
   * Enables selection of multiple items
   */
  @Prop()
  public multiselect: boolean;

  /**
   * Requires a selection of at least one item. If one item is selected it prevents the user from deselecting it
   */
  @Prop()
  public required: boolean;

  /**
   * Determines, whether the control is disabled or not
   */
  @Prop()
  public disabled: boolean;

  public getTemplate(item: any) {
    let template: any;

    switch (this.template) {
      case 'default':
        template = document.createElement('og-list-template-default');
        break;

      default:
        template = document.createElement(this.template);
        break;
    }
    template.item = item;
    template.options = this.templateOptions;
    template.selected = this.isItemSelected(item);
    template.disabled = this.isItemDisabled(item);
    template.onclick = () => this.listItemSelected(item);
    this.listContainer.appendChild(template);

    return
  }

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public itemSelected: EventEmitter<any>;

  @State()
  private internalSelection: Set<string> = new Set();

  public componentDidLoad() {
    this.handleSelectedPropChanged(this.selected);
    if (this.hasValidItems()) {
      this.listContainer.innerHTML = '';
      this.items.map((item) => this.getTemplate(item));
    }
  }

  public listItemSelected(item: any): void {
    if (!this.disabled && !item[this.templateOptions.disabled]) {
      const value = item[this.templateOptions.key];
      if (this.isItemSelected(item)) {
        // deny deselection last item if required flag is set?
        if (this.required && this.internalSelection.size === 1) {
          return;
        }
        if (this.multiselect) {
          // deselect with multiselect means: delete item, update internal state and property value
          this.internalSelection.delete(value);
          this.internalSelection = new Set(this.internalSelection);
          this.selected = Array.from(this.internalSelection);
        } else {
          // deselect without multiselect simply means: empty selection state and property
          this.internalSelection = new Set();
          this.selected = '';
        }
      } else {
        // add selected key to property array and update internal state
        // extend or replace state and property depending on multiselect
        if (this.multiselect) {
          this.selected = [...Array.from(this.internalSelection), value];
          this.internalSelection = new Set(this.selected);
        } else {
          this.internalSelection = new Set([value]);
          this.selected = value;
        }
      }
      // emit new property value
      if (this.multiselect) {
        this.itemSelected.emit(this.items.filter(item => this.internalSelection.has(item[this.templateOptions.key])))
      } else {
        this.itemSelected.emit(this.items.find(item => item[this.templateOptions.key] === this.selected));
      }
    }

    for (let i = 0; i < this.listContainer.children.length; i++) {
      const element = this.listContainer.children.item(i);
      (element as any).selected = this.isItemSelected((element as any).item);
    };

  }

  public isItemSelected(item: any): boolean {
    if (!item) {
      return false;
    }
    return this.internalSelection.has(item[this.templateOptions.key]);
  }

  private isItemDisabled(item: any): boolean {
    return item[this.templateOptions.disabled] || false;
  }

  private hasValidItems(): boolean {
    return Array.isArray(this.items) && this.items.length > 0;
  }

  public render(): HTMLElement {

    if (this.hasValidItems()) {
      return <div class="og-list" ref={el => { this.listContainer = el }}></div>
    } else {
      return <div>{this.emptyListMessage}</div>
    }
  }
}
