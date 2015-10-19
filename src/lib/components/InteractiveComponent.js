import Component from './Component';
import bindAll from 'lodash.bindall';
import { on, off } from 'dom-event';

export default class InteractiveComponent extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'onMouseOver', 'onMouseOut');
    if (!window.isMobile) { this.enableMouseEvents(); }
  }

  onMouseOver() {
    console.warn('You probably want to override onMouseOver on', Object.getPrototypeOf(this));
  }

  onMouseOut() {
    console.warn('You probably want to override onMouseOut on', Object.getPrototypeOf(this));
  }

  disableMouseEvents() {
    off(this.$el, 'mouseenter', this.onMouseOver);
    off(this.$el, 'mouseleave', this.onMouseOut);
  }

  enableMouseEvents() {
    on(this.$el, 'mouseenter', this.onMouseOver);
    on(this.$el, 'mouseleave', this.onMouseOut);
  }

  destroy() {
    this.disableMouseEvents();
  }
}