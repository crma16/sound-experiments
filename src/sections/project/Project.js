import Section from 'lib/components/Section';

export default class Project extends Section {
  constructor($el) {
    super($el);

    this.$iframe = this.$el.querySelector('iframe');
    this.$cross = this.$el.querySelector('.Project-close');

    this.tl = new TimelineMax();
    this.tl.fromTo(this.$iframe, 0.5, { alpha: 0 }, { alpha: 1, ease: Cubic.easeOut }, 0);
    this.tl.fromTo(this.$cross, 0.5, { alpha: 0 }, { alpha: 1, ease: Cubic.easeOut }, 0.2);
    this.tl.pause(0);

    this.tlOut = new TimelineMax();
    this.tlOut.to(this.$iframe, 0.4, { alpha: 0, ease: Cubic.easeOut }, 0);
    this.tlOut.to(this.$cross, 0.3, { alpha: 0, ease: Cubic.easeOut }, 0.1);
    this.tlOut.pause(0);
  }

  onInit() {}

  transitionIn(callback) {
    super.transitionIn(callback);
    this.tl.play(0);
  }

  transitionOut(callback) {
    this.tlOut.eventCallback('onComplete', callback);
    this.tlOut.play(0);
  }
}
