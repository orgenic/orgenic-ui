/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import {
  Component,
  Element,
  h,
  Host,
  Prop,
  State,
  Watch
} from '@stencil/core';

export interface GridData {
  columnCount: number;
  rowCount: number;
  columnSizes: number[];
  rowSizes: number[];
  columnLeftPositions: number[];
  rowTopPositions: number[];
}
@Component({
  tag: 'og-form-item-container',
  styleUrl: 'og-form-item-container.scss',
  shadow: true
})

export class OgFormItemContainer {
  @Prop()
  public itemMinWidth: string = '300px';

  @Prop()
  public itemMaxWidth: string = '1fr';

  @Prop()
  public itemGap: string = '10px';

  @State()
  public isInline: boolean = false;

  @Element()
  private container: HTMLElement;

  private updateGridTimeout: any;

  @Watch('itemMinWidth') public onItemMinWidthChanged() {
    this.updateGrid();
  }

  @Watch('itemMaxWidth') public onItemMaxWidthChanged() {
    this.updateGrid();
  }

  @Watch('itemGap') public onItemGapChanged() {
    this.updateGrid();
  }

  public componentDidLoad() {
    this.updateGrid();
  }

  public render(): HTMLElement {
    return <Host class={{
      'is-inline': this.isInline
    }}>
      <slot></slot>
    </Host>;
  }

  private applyItemMinWidth(value: string): void {
    this.container.style.setProperty('--og-form-item-container__item-MinWidth', value);
  }

  private applyItemMaxWidth(value: string): void {
    this.container.style.setProperty('--og-form-item-container__item-MaxWidth', value);
  }

  private applyItemGap(value: string): void {
    this.container.style.setProperty('--og-form-item-container-Gap', value);
  }

  private updateGrid(): void {
    // hide the container to make column changes invisible
    this.toggleContainerVisibility(false);
    this.removeGridColumnStartOnAllFormItems();
    this.applyItemMinWidth(this.itemMinWidth);
    this.applyItemMaxWidth(this.itemMaxWidth);
    this.applyItemGap(this.itemGap);

    if (this.updateGridTimeout) {
      clearTimeout(this.updateGridTimeout);
      this.updateGridTimeout = null;
    }

    this.updateGridTimeout = setTimeout(() => {
      this.examineFormItemsToStretch();
      this.toggleContainerVisibility(true);
    });

  }

  private examineFormItemsToStretch(): void {
    const allFormItems = this.container.querySelectorAll(':scope > og-form-item');
    if (!allFormItems) {
      return;
    }

    for (let i = 0; i < allFormItems.length; i++) {
      const formItem = allFormItems[i];
      // try to find items that are supposed to fill the remaining columns
      // within their row and that are not also meant to create a new row
      // by themselves, because this scenario ('.new-row.full-width') is
      // already handled by CSS
      const isFullWidthFormItem = i > 0 && formItem.classList.contains('full-width') && !formItem.classList.contains('new-row');
      if (isFullWidthFormItem) {
        let fullWidthFormItemStartColumn = 1;
        const fullWidthFormItem = formItem as HTMLElement;
        const previousFormItem = allFormItems[i - 1];
        const hasRelevantPreviousItem = previousFormItem && !previousFormItem.classList.contains('full-width');
        if (hasRelevantPreviousItem) {
          const relevantPreviousItemColumn = this.getElementColumn(previousFormItem);
          if (relevantPreviousItemColumn + 1 < this.getGridData().columnCount) {
            fullWidthFormItemStartColumn = relevantPreviousItemColumn + 1;
          }
        }

        this.setFormItemGridColumnStart(fullWidthFormItem, fullWidthFormItemStartColumn);
      }
    }
  }

  private getElementColumn(el: Element): number {
    let column = 1;
    const gridData = this.getGridData();
    const gridColumns = gridData.columnCount;
    const gridColumnLeftPositions = gridData.columnLeftPositions;

    const containerPaddingLeft = parseInt(window.getComputedStyle(this.container).paddingLeft);
    const containerPositionLeft = this.container.getBoundingClientRect().left;
    const containerFirstColPositionLeft = containerPositionLeft + containerPaddingLeft;
    const elPositionLeft = el.getBoundingClientRect().left;
    const elPositionLeftInContainer = elPositionLeft - containerFirstColPositionLeft;

    for (let i = gridColumns; i > 0; i--) {
      column = i;
      if (elPositionLeftInContainer >= gridColumnLeftPositions[i - 1]) {
        break;
      }
    }

    return column;
  }

  /*
  private getElementRow(el: Element): number {
    let row = 1;
    const gridData = this.getGridData();
    const gridRows = gridData.rowCount;
    const gridRowopPositions = gridData.rowTopPositions;

    const containerPaddingTop = parseInt(window.getComputedStyle(this.container).paddingTop);
    const containerPositionTop = this.container.getBoundingClientRect().top;
    const containerFirstRowPositionTop = containerPositionTop + containerPaddingTop;
    const elPositionTop = el.getBoundingClientRect().top;
    const elPositionTopInContainer = elPositionTop - containerFirstRowPositionTop;

    for (let i = gridRows; i > 0; i--) {
      row = i;
      if (elPositionTopInContainer >= gridRowopPositions[i - 1]) {
        break;
      }
    }

    return row;
  }
  */

  private getGridData(): GridData {
    const gridComputedStyle = window.getComputedStyle(this.container);
    const gridTemplateColumns = gridComputedStyle.getPropertyValue("grid-template-columns");
    const gridTemplateRows = gridComputedStyle.getPropertyValue("grid-template-rows");
    const gridColumnLeftPositions = [0];
    const gridRowTopPositions = [0];

    // get number of grid columns
    const gridColumnCount = gridTemplateColumns.split(" ").length;
    // get number of grid rows
    const gridRowCount = gridTemplateRows.split(" ").length;
    // get grid column sizes
    const gridColumnSizes = gridTemplateColumns.split(" ").map(parseFloat);
    // get grid row sizes
    const gridRowSizes = gridTemplateRows.split(" ").map(parseFloat);
    // get grid column left positions (does not respect column gap!)
    for (let i = 1; i < gridColumnSizes.length; i++) {
      const gridColumnLeftPosition = gridColumnSizes[i] + (gridColumnLeftPositions[i - 1] || 0);
      gridColumnLeftPositions.push(gridColumnLeftPosition);
    }
    // get grid row top positions (does not respect row gap!)
    for (let i = 1; i < gridRowSizes.length; i++) {
      const gridRowTopPosition = gridRowSizes[i] + (gridRowTopPositions[i - 1] || 0);
      gridRowTopPositions.push(gridRowTopPosition);
    }

    return {
      columnCount: gridColumnCount,
      rowCount: gridRowCount,
      columnSizes: gridColumnSizes,
      rowSizes: gridRowSizes,
      columnLeftPositions: gridColumnLeftPositions,
      rowTopPositions: gridRowTopPositions
    };
  }

  private toggleContainerVisibility(visible: boolean): void {
    this.container.style.visibility = visible ? '' : 'hidden';
  }

  private removeGridColumnStartOnAllFormItems(): void {
    const allFormItems = this.container.querySelectorAll(':scope > og-form-item');
    if (!allFormItems) {
      return;
    }

    allFormItems.forEach(formItem => {
      const formItemElement = formItem as HTMLElement;
      this.removeFormItemGridColumnStart(formItemElement);
    });
  }

  private removeFormItemGridColumnStart(el: HTMLElement): void {
    el.style.gridColumnStart = null;
  }

  private setFormItemGridColumnStart(el: HTMLElement, value: number): void {
    el.style.gridColumnStart = value.toString();
  }

}
