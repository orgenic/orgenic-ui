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

    /**
     * Event is being emitted when value changes.
     */
    @Event() clicked: EventEmitter<Event>;

    componentDidLoad() {
        setTimeout(() => {
            const slot = this.el.querySelector('slot') as HTMLSlotElement;
            console.log('slot children', slot.assignedElements);
        });
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
            <button class="og-menu-item" onClick={ (e) => this.handleClick(e) } disabled={ this.disabled }>{this.label}</button>,
            <slot></slot>
        ];
    }
}
