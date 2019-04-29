import { Component, Prop, Method } from '@stencil/core';

@Component({
  tag: 'og-menu',
  styleUrl: 'og-menu.scss',
  shadow: true
})
export class OgMenu {
    /**
     * Determines, which menu is assigned to this trigger
     */
    @Prop({ reflectToAttr: true }) name: string;

    @Prop({ mutable: true, reflectToAttr: true }) visible: boolean;

    @Method()
    toggleVisibility() {
        this.visible = !this.visible;
    }

    render() {
        return (
            <div class={ `og-menu__container${this.visible ? ' og-menu__container--visible' : ''}` }>
                <slot></slot>
                <div class="og-menu__footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        );
    }
}
