import { Component, Prop, Method } from '@stencil/core';

@Component({
  tag: 'og-menu-group',
  styleUrl: 'og-menu-group.scss',
  shadow: true
})
export class OgMenuGroup {
    @Prop() name: string;

    @Prop() collapsible: boolean = false;

    @Prop({ mutable: true, reflectToAttr: true }) collapsed: boolean = false;

    /**
     * Use this method to toggle expanded state. Group property is respected when calling this method.
     */
    @Method()
    toggleCollapsedState() {
        console.log('toggle', this.collapsible, this.collapsed);
        if (!this.collapsible) {
            return;
        }
        this.collapsed = !this.collapsed;
    }

    render() {
        return [
            this.name &&
            <div class="og-expander__header" onClick={() => { this.toggleCollapsedState(); }}>
                <span class="og-expander__title">{this.name}</span>
                {
                    this.collapsible &&
                    <div class="og-expander__button">
                        <svg
                            class={
                                'og-expander__button__arrow' +
                                (!this.collapsed
                                    ? ' og-expander__button__arrow--collapsed'
                                    : '')
                            }
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 24 12"
                            preserveAspectRatio="none"
                        >
                            <polyline
                                class="og-expander__button__arrow__line"
                                points="0,0 12,12 24,0"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecaps="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                }
            </div>,
            <div class="og-expander__content" data-expanded={!this.collapsed}>
                <slot></slot>
            </div>
        ];
    }
}
