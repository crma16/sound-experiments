import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import bindAll from 'lodash.bindAll';

export default class Footer extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'transitionIn');

    Mediator.on('footer:transitionIn', this.transitionIn);

    this.visible = false;

    this.tl = new TimelineMax();
    this.tl.fromTo(this.$el, 0.8, { y: 100, alpha: 0 }, { y: 0, alpha: 1, ease: Expo.easeOut }, 0.9);
    this.tl.pause(0);
  }

  onInit() {}

  transitionIn() {
    if (this.visible) { return; }

    this.tl.play(0);
    this.visible = true;
  }
}