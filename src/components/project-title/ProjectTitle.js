import Component from 'lib/components/Component';
import classes from 'dom-classes';

export default class ProjectTitle extends Component {
  constructor($el) {
    super($el);

    this.isReversed = classes.has(this.$el, 'reverse');
    this.isVisible = false;
    this.$line = this.$el.querySelector('.ProjectTitle-line');
    this.$separator = this.$el.querySelector('.ProjectTitle-separator');
    this.$title = this.$el.querySelector('.ProjectTitle-text-top');
    this.$author = this.$el.querySelector('.ProjectTitle-text-bottom');
    this.$number = this.$el.querySelector('.ProjectTitle-number');

    this.tlIn = new TimelineMax();
    this.tlOut = new TimelineMax();
    this.setTimelines();
  }

  show() {
    if (this.tlOut) {
      this.tlOut.kill();
    }

    this.isVisible = true;
    this.tlIn.play(0);
  }

  hide() {
    if (this.tlIn) {
      this.tlIn.kill();
    }

    this.isVisible = false;
    this.tlOut.play(0);
  }

  setLineHeight(value) {
    this.$line.style.height = `${value}px`;
  }

  setTimelines() {
    let dir = 1;

    if (this.isReversed) {
      dir = -1;
    }

    this.tlIn.fromTo(this.$line, 0.6, { scaleY: 0 }, { scaleY: 1, ease: Cubic.easeOut }, 0.25);
    this.tlIn.fromTo(this.$separator, 0.5, { scaleY: 0 }, { scaleY: 1, ease: Cubic.easeOut }, 0.55);
    this.tlIn.fromTo(this.$author, 1.2, { x: -290 * dir }, { x: 2, ease: Cubic.easeOut }, 0.5);
    this.tlIn.fromTo(this.$number, 0.6, { x: 45 * dir }, { x: 0, ease: Cubic.easeOut }, 0.75);
    this.tlIn.fromTo(this.$title, 0.8, { x: -150 * dir, alpha: 0 }, { x: 2, alpha: 1, ease: Cubic.easeOut }, 0.85);
    this.tlIn.pause(0);

    this.tlOut.to(this.$author, 1.0, { x: -290 * dir, ease: Cubic.easeOut }, 0);
    this.tlOut.to(this.$number, 0.4, { x: 45 * dir, ease: Cubic.easeOut }, 0.1);
    this.tlOut.to(this.$title, 0.6, { x: -150 * dir, alpha: 0, ease: Cubic.easeOut }, 0.2);
    this.tlOut.to(this.$separator, 0.5, { scaleY: 0, ease: Cubic.easeOut }, 0.3);
    this.tlOut.to(this.$line, 0.5, { scaleY: 0, ease: Cubic.easeOut }, 0.4);
    this.tlOut.pause(0);
  }
}