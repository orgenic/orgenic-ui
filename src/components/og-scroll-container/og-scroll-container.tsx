/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Host, State, Element } from '@stencil/core';

@Component({
  tag: 'og-scroll-container',
  styleUrl: 'og-scroll-container.scss',
  shadow: true
})
export class OgScrollContainer {
  @Element()
  public el: HTMLElement;

  /** Enables eventListener for mouse moving */
  @State()
  public enableMoving = false;

  /** Sets the axis where we want to scroll */
  @State()
  public axis: string = 'x' || 'y';

  /** Initial mouse X position. Is set by MouseDown. */
  @State()
  private mouseXPosInitial: number;

  /** Initial mouse Y position. Is set by MouseDown. */
  @State()
  private mouseYPosInitial: number;

  /** Current mouse X position. Is set by MouseMove. */
  @State()
  private mouseXPos: number;

  /** Current mouse Y position. Is set by MouseMove. */
  @State()
  private mouseYPos: number;

  /** Inital Scrollbar Thumb X position. Is set by MouseDown */
  @State()
  private xThumbPosInitial: number;

  /** Inital Scrollbar Thumb Y position. Is set by MouseDown */
  @State()
  private yThumbPosInitial: number;

  /** Current Scrollbar Thumb X position */
  @State()
  private xThumbPos = 0;

  /** Current Scrollbar Thumb Y position */
  @State()
  private yThumbPos = 0;

  /** Current Scrollbar Thumb X size */
  @State()
  private xThumbSize = 0;

  /** Current Scrollbar Thumb Y size */
  @State()
  private yThumbSize = 0;

  private containerElement: HTMLElement;
  private hasScrollbarX: boolean = false;
  private hasScrollbarY: boolean = false;
  private factorScrollbarX: number = 1;   // 1 = 100% scrollbar width
  private factorScrollbarY: number = 1;   // 1 = 100% scrollbar height

  public constructor() {
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  public componentDidRender() {
    this.containerElement = this.el.shadowRoot.querySelector(".og-scroll-container__content-wrapper");

    const contentWidth = this.containerElement.scrollWidth;
    const contentHeight = this.containerElement.scrollHeight;
    const containerWidth = this.containerElement.clientWidth;
    const containerHeight = this.containerElement.clientHeight;

    this.hasScrollbarX = (contentWidth > containerWidth);
    this.hasScrollbarY = (contentHeight > containerHeight);

    // horizontal
    if (this.hasScrollbarX) {
      this.factorScrollbarX = containerWidth / contentWidth;
      this.xThumbSize = containerWidth * this.factorScrollbarX;
    }

    // vertical
    if (this.hasScrollbarY) {
      this.factorScrollbarY = containerHeight / contentHeight;
      this.yThumbSize = containerHeight * this.factorScrollbarY;
    }

    this.el.addEventListener('mousewheel', this.handleMouseWheel);
    this.el.addEventListener('touchstart', this.handleTouchStart);
  }

  private handleMouseDown = (event: MouseEvent, axis: string) => {
    this.enableMoving = true;
    this.axis = axis;
    this.mouseXPosInitial = event.x;
    this.mouseYPosInitial = event.y;
    this.yThumbPosInitial = this.yThumbPos;
    this.xThumbPosInitial = this.xThumbPos;
    document.body.addEventListener('mouseup', this.handleMouseUp);
    document.body.addEventListener('mousemove', this.handleMouseMove);
    document.body.addEventListener('mouseleave', this.handleMouseUp);
  }

  private handleMouseUp = () => {
    this.enableMoving = false;
    this.axis = undefined;
    document.body.removeEventListener('mouseup', this.handleMouseUp);
    document.body.removeEventListener('mousemove', this.handleMouseMove);
    document.body.removeEventListener('mouseleave', this.handleMouseUp);
  }

  /** Calculates thumb position depending on mouse position */
  private calculateThumbPosition = () => {
    switch (this.axis) {
      case 'x':
        this.xThumbPos = Math.max(0, this.xThumbPosInitial + this.mouseXPos - this.mouseXPosInitial);
        this.xThumbPos = Math.min(this.el.clientWidth - this.xThumbSize, this.xThumbPos);
        break;

      case 'y':
        this.yThumbPos = Math.max(0, this.yThumbPosInitial + this.mouseYPos - this.mouseYPosInitial);
        this.yThumbPos = Math.min(this.el.clientHeight - this.yThumbSize, this.yThumbPos);
        break;
    }
  }

  /** Fetches mouse coordinates and pushes them to the scrollbar thumb */
  private handleMouseMove = (event: MouseEvent) => {
    if (!this.enableMoving) {
      return;
    }
    this.mouseXPos = event.x;
    this.mouseYPos = event.y;

    this.calculateThumbPosition();

    this.containerElement.scrollTop = this.yThumbPos / this.factorScrollbarY;
    this.containerElement.scrollLeft = this.xThumbPos / this.factorScrollbarX;
  }

  private handleTouchStart = (event: TouchEvent) => {
    this.enableMoving = true;
    this.mouseXPosInitial = event.touches[0].clientX;
    this.mouseYPosInitial = event.touches[0].clientY;
    this.yThumbPosInitial = this.yThumbPos;
    this.xThumbPosInitial = this.xThumbPos;
    document.body.addEventListener('touchend', this.handleTouchEnd);
    document.body.addEventListener('touchmove', this.handleTouchMove);
  }

  private handleTouchEnd = () => {
    this.enableMoving = false;
    document.body.removeEventListener('touchend', this.handleTouchEnd);
    document.body.removeEventListener('touchmove', this.handleTouchMove);
  }

  /** Calculates thumb position depending on mouse position */
  private calculateThumbPositionTouch = () => {
    // this.xThumbPos = Math.max(0, this.xThumbPosInitial + this.mouseXPos - this.mouseXPosInitial);
    // this.xThumbPos = Math.min(this.el.clientWidth - this.xThumbSize, this.xThumbPos);
    // this.yThumbPos = Math.max(0, this.yThumbPosInitial + this.mouseYPos - this.mouseYPosInitial);
    // this.yThumbPos = Math.min(this.el.clientHeight - this.yThumbSize, this.yThumbPos);

    this.yThumbPos = this.containerElement.scrollTop * this.factorScrollbarY;
    this.xThumbPos = this.containerElement.scrollLeft * this.factorScrollbarX;
  }

  /** Fetches mouse coordinates and pushes them to the scrollbar thumb */
  private handleTouchMove = (event: TouchEvent) => {
    if (!this.enableMoving) {
      return;
    }
    this.mouseXPos = event.touches[0].clientX;
    this.mouseYPos = event.touches[0].clientY;


    this.containerElement.scrollTop += this.mouseYPosInitial - this.mouseYPos;
    this.containerElement.scrollLeft += this.mouseXPosInitial - this.mouseXPos;

    this.calculateThumbPositionTouch();
    // event.preventDefault();
  }

  private handleMouseWheel = (event: WheelEvent) => {
    const prevScrollTop = this.containerElement.scrollTop;
    const prevScrollLeft = this.containerElement.scrollLeft;

    this.containerElement.scrollTop += event.deltaY;
    this.yThumbPos = this.containerElement.scrollTop * this.factorScrollbarY;
    this.containerElement.scrollLeft += event.deltaX;
    this.xThumbPos = this.containerElement.scrollLeft * this.factorScrollbarX;

    if (prevScrollTop !== this.containerElement.scrollTop || prevScrollLeft !== this.containerElement.scrollLeft) {
      event.preventDefault();
    }
  }

  public render(): HTMLElement {

    return (
      <Host>
        <div class="og-scroll-container__content-wrapper">
          <div class="og-scroll-container__content">
            <slot></slot>
          </div>
        </div>

        { this.hasScrollbarY &&
          <div id="scrollbar-y" class="og-scroll-container__track og-scroll-container__track--y">
            <div
              id="thumb-y"
              class={{
                'og-scroll-container__thumb og-scroll-container__thumb--y ': true,
                'is-active': this.enableMoving && this.axis === 'y'
              }}
              style={{
                'top': this.yThumbPos.toString() + 'px',
                'height': 'calc(' + this.yThumbSize + 'px - (3/2 * var(--thumb-size--long)))'
              }}
              onMouseDown={(event) => this.handleMouseDown(event, 'y')}
            ></div>
          </div>
        }

        { this.hasScrollbarX &&
          <div id="scrollbar-x" class="og-scroll-container__track og-scroll-container__track--x">
            <div
              id="thumb-x"
              class={{
                'og-scroll-container__thumb og-scroll-container__thumb--x ': true,
                'is-active': this.enableMoving && this.axis === 'x'
              }}
              style={{
                'left': this.xThumbPos.toString() + 'px',
                'width': 'calc(' + this.xThumbSize + 'px - (3/2 * var(--thumb-size--long)))'
              }}
              onMouseDown={(event) => this.handleMouseDown(event, 'x')}
            ></div>
          </div>
        }

      </Host>
    );
  }
}