import Section from 'lib/components/Section';
import Mediator from 'lib/Mediator';

export default class About extends Section {
  constructor($el) {
    super($el);

    let p = this.$el.querySelectorAll('p');

    this.tl = new TimelineMax();
    this.tl.staggerFromTo(p, 1.2, { y: 100, alpha: 0 }, { y: 0, alpha: 1, ease: Expo.easeOut }, 0.08, 0);
    this.tl.pause(0);

    this.tlOut = new TimelineMax();
    this.tlOut.staggerTo(p, 0.6, { y: 100, alpha: 0, ease: Cubic.easeOut }, -0.08, 0);
    this.tlOut.pause(0);
  }

  onInit() {}

  transitionIn(callback) {
    super.transitionIn(callback);
    Mediator.emit('header:transitionIn');
    Mediator.emit('footer:transitionIn');
    this.tl.play(0);
  }

  transitionOut(callback) {
    this.tlOut.eventCallback('onComplete', callback);
    this.tlOut.play(0);
  }
}
