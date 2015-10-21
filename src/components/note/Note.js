import InteractiveComponent from 'lib/components/InteractiveComponent';
import Mediator from 'lib/Mediator';

export default class Note extends InteractiveComponent {
  constructor($el) {
    super($el);

    this.$point = this.$el.querySelector('.Note-point');
    this.id = ~~this.$el.getAttribute('data-ref').replace('note-', '');
  }

  onMouseOver() {
    Mediator.emit('note:over', this.id);
  }

  onMouseOut() {
    Mediator.emit('note:out', this.id);
  }
}
