import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'og-menu-trigger',
  styleUrl: 'og-menu-trigger.scss',
  shadow: true
})
export class OgButton {
    /**
     * Determines, whether the control is disabled or not
     */
    @Prop() disabled: boolean;

    /**
     * Determines, which menu is assigned to this trigger
     */
    @Prop() menu: string;

    handleClick(_e: Event) {
        const menu = document.querySelector(`og-menu[name=${this.menu}]`) as HTMLOgMenuElement;
        menu.toggleVisibility();
    }

    render() {
        return <og-button onClicked={ (e) => this.handleClick(e) } disabled={ this.disabled } label="M"></og-button>;
    }
}
