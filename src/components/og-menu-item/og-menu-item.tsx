import { Component, Prop, EventEmitter, Event, Element } from '@stencil/core';

@Component({
  tag: 'og-menu-item',
  styleUrl: 'og-menu-item.scss',
  shadow: true
})
export class OgMenuItem {
    @Element() el: HTMLElement;

    /**
     * The label of the button
     */
    @Prop() label: string;

    /**
     * Determines, whether the control is disabled or not
     */
    @Prop() disabled: boolean;

    @Prop() selected: boolean;

    /**
     * Event is being emitted when value changes.
     */
    @Event() clicked: EventEmitter<Event>;

    componentDidLoad() {
        const slot = this.el.shadowRoot.querySelector('slot') as HTMLSlotElement;
        if (!slot || !slot.assignedNodes) {
            return;
        }

        if (slot.assignedNodes().length === 0 && !this.label) {
            console.warn('Menu items should use either the slot element or the label property.');
        }

        if (slot.assignedNodes().length > 0 && this.label) {
            console.warn('Menu items should not use the slot element and the label properties together.');
        }
    }

    handleClick(e: Event) {
        if (!this.disabled) {
            this.clicked.emit(e);
        }
        e.cancelBubble = true;
    }

    render() {
        return [
            this.label &&
            <div class="og-menu-item" onClick={ (e) => this.handleClick(e) } data-disabled={ this.disabled } data-selected={ this.selected }>
                {this.label}
            </div>,
            <slot></slot>
        ];
    }
}
