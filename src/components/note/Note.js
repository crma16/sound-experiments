import InteractiveComponent from 'lib/components/InteractiveComponent';
import Mediator from 'lib/Mediator';
import { on, off } from 'dom-event';
import bindAll from 'lodash.bindAll';

export default class Note extends InteractiveComponent {
  constructor($el) {
    super($el);

    bindAll(this, 'onClick');

    this.$point = this.$el.querySelector('.Note-point');
    this.id = ~~this.$el.getAttribute('data-ref').replace('note-', '');
    on(this.$el, 'click', this.onClick);
  }

  destroy() {
    off(this.$el, 'click', this.onClick);
    super.destroy();
  }

  onClick() {
    Mediator.emit('note:click', this.$point.getBoundingClientRect().left, this.$point.getBoundingClientRect().top);
  }

  onMouseOver() {
    Mediator.emit('note:over', this.id);
  }

  onMouseOut() {
    Mediator.emit('note:out', this.id);
  }
}
