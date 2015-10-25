import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import bindAll from 'lodash.bindAll';

export default class Loader extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'transitionIn');

    this.visible = false;

    this.$h1 = this.$el.querySelector('h1');
    this.$text = this.$el.querySelector('.Intro-content > p');
    this.$loader = this.$el.querySelector('.Loader');

    this.tl = new TimelineMax();
    this.tl.staggerFromTo([this.$h1, this.$text], 1.0, { y: -100, alpha: 0 }, { y: 0, alpha: 1, ease: Expo.easeOut }, 0.08, 0.4);
    this.tl.pause(0);

    Mediator.on('loader:transitionIn', this.transitionIn);
  }

  onInit() {}

  transitionIn() {
    if (this.visible) { return; }

    this.tl.play(0);
    this.visible = true;

    // Mediator.emit('header:transitionIn');
    // this.refs.sheet.transitionIn();
    // Mediator.emit('footer:transitionIn');
  }
}
