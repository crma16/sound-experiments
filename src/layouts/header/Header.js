import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import bindAll from 'lodash.bindAll';
import classes from 'dom-classes';

export default class Header extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'transitionIn');

    this.visible = false;

    this.$h1 = this.$el.querySelector('h1');

    this.tl = new TimelineMax();
    this.tl.fromTo(this.$h1, 1.0, { y: -100, alpha: 0 }, { y: 0, alpha: 1, ease: Expo.easeOut }, 0.4);
    this.tl.pause(0);

    Mediator.on('header:transitionIn', this.transitionIn);
  }

  onInit() {}

  transitionIn() {
    if (this.visible) { return; }

    classes.remove(this.$el, 'hidden');
    this.tl.play(0);
    this.visible = true;
  }
}
