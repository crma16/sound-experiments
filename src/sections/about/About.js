import Section from 'lib/components/Section';
import Mediator from 'lib/Mediator';

export default class About extends Section {
  constructor($el) {
    super($el);

    this.tl = new TimelineMax();
    this.tl.staggerFromTo(this.$el.querySelectorAll('p'), 1.2, { y: 100, alpha: 0 }, { y: 0, alpha: 1, ease: Expo.easeOut }, 0.08, 0);
    this.tl.pause(0);
  }

  onInit() {}

  transitionIn(callback) {
    super.transitionIn(callback);
    Mediator.emit('header:transitionIn');
    Mediator.emit('footer:transitionIn');
    this.tl.play(0);
  }
}
