import { Component, Prop, Method } from '@stencil/core';

@Component({
  tag: 'og-menu-group',
  styleUrl: 'og-menu-group.scss',
  shadow: true
})
export class OgMenuGroup {
    @Prop() name: string;

    @Prop() collapsible: boolean = false;

    render() {
        return (
            <og-expander name={ this.name }>
                <slot></slot>
            </og-expander>
        );
    }
}
