/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, Element, EventEmitter, Event, Watch, State, Host } from '@stencil/core';

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
   * Set the property for the items to define as value. Default: 'key'
   */
  @Prop()
  public keyProperty: string = 'key';

  /**
   * Set the property for the items to define as image url. *Optional* Default: no image
   */
  @Prop()
  public imageUrlProperty?: string;

  /**
   * Set the property for the items to define as label. Default: 'label'
   */
  @Prop()
  public labelProperty: string = 'label';

  /**
   * Set the property for the items to define as value. *Optional* Default: no value
   */
  @Prop()
  public valueProperty: string;

  /**
   * Set the property for the items to define as disabled. Default: 'disabled'
   */
  @Prop()
  public disabledProperty: string = 'disabled';

  /**
   * Key(s) of the selected list item(s)
   */
  @Prop({ mutable: true, reflect: true })
  public selected: string | string[];

  /**
   * An array of items to choose from
   */
  @Prop()
  public items: any[];

  /**
   * Name of the template (component) we want to use as list item.
   */
  @Prop()
  public template: string = 'og-list-item';

  /**
   * Contains an Object with options to match template properties.
   *
   * Mandatory: {key: any}
   *
   * Default template:
   * {key: any, label: string, subline: string, overline: string,
   * image: string, value: string, disabled: string}
   */
  @Prop({ mutable: true })
  public templateOptions: any;

  /**
   * Set the text that will be displayed if the items array is empty.
   */
  @Prop()
  public emptyListMessage: string = 'No items available';

  /**
   * Enables selection of multiple items
   */
  @Prop()
  public multiselect: boolean = false;

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

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public itemSelected: EventEmitter<any>;

  @State()
  private internalSelection: string | string[];

  @Watch('selected')
  public handleSelectedPropChanged(newValue: string | string[]) {
    if (this.multiselect) {
      // try to parse html encoded string to array
      if (typeof newValue === 'string') {
        newValue = JSON.parse(newValue);
        if (typeof newValue === 'string') {
          newValue = [];
        }
      } else if (newValue === undefined) {
        newValue = [];
      }
      this.internalSelection = newValue;
    } else {
      if (newValue === undefined) {
        this.internalSelection = [];
      } else {
        this.internalSelection = [newValue as string];
      }
    }
  }

  private getTemplate(item: any): HTMLElement {
    const template = document.createElement(this.template) as any;
    this.setItemProperties(item, template);
    return template;
  }

  private setItemProperties(item: any, element: any) {
    element.item = item;
    element.options = this.handleTemplateOptions();
    element.selected = this.isItemSelected(item);
    element.disabled = this.isItemDisabled(item);
    element.onclick = () => this.listItemSelected(item);
  }

  public componentDidLoad() {
    this.handleSelectedPropChanged(this.selected);
  }

  public listItemSelected(item: any): void {
    if (!this.disabled && !this.isItemDisabled(item)) {
      const value = this.getKeyValue(item);

      if (this.isItemSelected(item)) {
        // deny deselection last item if required flag is set?
        if (this.required && this.internalSelection.length === 1) {
          return;
        }
        if (this.multiselect) {
          // deselect with multiselect means: delete item, update internal state and property value
          const itemIndex = this.internalSelection.indexOf((this.internalSelection as []).find(el => this.getKeyValue(item) === el));

          (this.internalSelection as []).splice(itemIndex, 1);
          this.selected = this.internalSelection;
        } else {
          // deselect without multiselect simply means: empty selection state and property
          this.internalSelection = [];
          this.selected = '';
        }
      } else {
        // add selected key to property array and update internal state
        // extend or replace state and property depending on multiselect
        if (this.multiselect) {
          this.selected = [...Array.from(this.internalSelection), value];
          this.internalSelection = this.selected;
        } else {
          this.internalSelection = [value];
          this.selected = value;
        }
      }
      // emit new property value
      if (this.multiselect) {
        this.itemSelected.emit(this.items.filter(item => this.isItemSelected(item)));
      } else {
        this.itemSelected.emit(this.items.find(item => this.getKeyValue(item) === this.selected));
      }
    }

    for (let i = 0; i < this.listContainer.children.length; i++) {
      const element = this.listContainer.children.item(i);
      (element as any).selected = this.isItemSelected((element as any).item);
    }
  }

  public isItemSelected(item: any): boolean {
    if (!item || !this.internalSelection) {
      return false;
    }
    if (typeof this.internalSelection === 'string') {
      return this.internalSelection === item;
    } else {
      const selectedItem = (this.internalSelection as []).find(el => this.getKeyValue(item) === el);
      return selectedItem ? true : false;
    }
  }

  private handleTemplateOptions(): object {
    let options: any = {};

    if (this.templateOptions) {
      options = this.templateOptions;
    } else {
      options.key = this.keyProperty;
      options.label = this.labelProperty;
      options.image = this.imageUrlProperty;
      options.disabled = this.disabledProperty;
      options.value = this.valueProperty;
    }

    return options;
  }

  private isItemDisabled(item: any): boolean {
    if (!item) {
      return false;
    }
    return (this.disabledProperty && item[this.disabledProperty]) || (this.templateOptions && item[this.templateOptions.disabled]) || false;
  }

  private getKeyValue(item: any): string {
    const result = (this.keyProperty && item[this.keyProperty]) || (this.templateOptions && item[this.templateOptions.key] );
    return result + '';
  }

  private hasValidItems(): boolean {
    return Array.isArray(this.items) && this.items.length > 0;
  }

  private removeEmptyMessage() {
    const childNodes = this.listContainer.childNodes;
    if (childNodes && childNodes[0] && childNodes[0].nodeType === Node.TEXT_NODE) {
      childNodes[0].remove()
    }
  }

  private prepareListContent(el: HTMLElement) {
    this.listContainer = el;

    if (this.hasValidItems()) {
      this.removeEmptyMessage();
      const elements = el.querySelectorAll(this.template);

      /**
       * If the amount of list items doesn't change,
       * we simply update the properties.
       */
      if (this.items.length === elements.length) {
        this.items.map((item, index) => this.setItemProperties(item, elements.item(index)));
        return;
      }

      /**
       * If items has more content then available DOM nodes, we update
       * existing and add new nodes.
       */
      if (this.items.length > elements.length) {
        this.items.map((item, index) => {

          if (elements.item(index)) {
            this.setItemProperties(item, elements.item(index));
            return;
          }

          const newNode = this.getTemplate(item);
          this.listContainer.appendChild(newNode);
          this.setItemProperties(item, newNode);
        });
        return;
      }

      /**
       * If items has less content then available DOM nodes, we update
       * existing and remove last.
       */
      if (this.items.length < elements.length) {
        Array.from(elements).map((element, index) => {
          if (this.items[index]) {
            this.setItemProperties(this.items[index], element);
          } else {
            element.remove();
          }
        });
        return;
      }

    } else {
      this.listContainer.textContent = this.emptyListMessage;
    }
  }

  public render(): HTMLElement {
    return <Host disabled={this.disabled}>
      <div class="og-list" ref={ el => this.prepareListContent(el) }></div>
    </Host>

  }
}
