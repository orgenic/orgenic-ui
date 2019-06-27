/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, State } from '@stencil/core';

@Component({
    tag: 'og-menu-trigger',
    styleUrl: 'og-menu-trigger.scss',
    shadow: true
})
export class OgMenuTrigger {
    /**
     * The label of the menu trigger to open the menu
     */
    @Prop() labelOpen: string = 'Open menu';

    /**
     * The label of the menu trigger to close the menu
     */
    @Prop() labelClose: string = 'Close menu';

    /**
     * Determines, whether the menu trigger is disabled or not
     */
    @Prop() disabled: boolean;

    /**
     * Determines, which menu is assigned to the trigger
     */
    @Prop() menu: string;

    correspondingMenu: HTMLOgMenuElement;
    correspondingMenuObserver: MutationObserver;
    correspondingMenuObserved: boolean = false;
    // If this state changes, we want to run render() again
    @State() correspondingMenuVisible: boolean = false;

    connectedCallback() {
        this.correspondingMenu = this.getCorrespondingMenu();
        this.initMenuObserver();
        this.observeMenu();
    }

    disconnectedCallback() {
        this.disconnectMenuObserver();
    }

    getCorrespondingMenu(): HTMLOgMenuElement {
        return document.querySelector(`og-menu[name=${this.menu}]`) as unknown as HTMLOgMenuElement || null;
    }

    handleClick(_e: Event) {
        const menu = this.correspondingMenu || this.getCorrespondingMenu();
        if (menu) {
            menu.toggleVisibility();
        }
    }

    initMenuObserver = (): void => {
        // return if observer already present
        if (this.correspondingMenuObserver) {
            return;
        }

        this.correspondingMenuObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                const property = mutation.attributeName;
                const target = mutation.target;
                if (property === 'visible') {
                    this.correspondingMenuVisible = target['visible'];
                }
            });
        });
    }

    observeMenu = (): void => {
        // return if no menu available or no observer present or already observing
        if (!this.correspondingMenuObserver || !this.correspondingMenu || this.correspondingMenuObserved) {
            return;
        }

        this.correspondingMenuObserver.observe(this.correspondingMenu, {
            attributes: true
        });
        this.correspondingMenuObserved = true;
    }

    disconnectMenuObserver = (): void => {
        if (this.correspondingMenuObserver) {
            this.correspondingMenuObserver.disconnect();
            this.correspondingMenuObserved = false;
        }
    }

    render() {
        return <og-button onClicked={(e) => this.handleClick(e)} disabled={this.disabled} label={this.correspondingMenuVisible ? this.labelClose : this.labelOpen}></og-button>;
    }

}
