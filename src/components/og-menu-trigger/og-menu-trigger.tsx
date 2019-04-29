import { Component, Prop } from '@stencil/core';
import { SvgRegistry } from '../../utils/svg-registry';

@Component({
  tag: 'og-menu-trigger',
  styleUrl: 'og-menu-trigger.scss',
  shadow: true
})
export class OgMenuTrigger {
    /**
     * Determines, whether the control is disabled or not
     */
    @Prop() disabled: boolean;

    /**
     * Determines, which menu is assigned to this trigger
     */
    @Prop() menu: string;

    @Prop() label: string;

    @Prop() icon: string = SvgRegistry.getIcon('stroke', 'menu');

    handleClick(_e: Event) {
        const menu = document.querySelector(`og-menu[name=${this.menu}]`) as HTMLOgMenuElement;
        menu.toggleVisibility();
    }

    render() {
        return <og-button onClicked={ (e) => this.handleClick(e) } disabled={ this.disabled } icon={ this.icon } label={ this.label }></og-button>;
    }
}
