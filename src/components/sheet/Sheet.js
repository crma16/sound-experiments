import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import bindAll from 'lodash.bindAll';
import resize from 'brindille-resize';
import css from 'component-css';

export default class Sheet extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'onResize', 'onNoteOver', 'onNoteOut');

    this.$lines;
    this.$notes;
    this.$container = this.$el.querySelector('.Sheet-note-container');

    resize.addListener(this.onResize);
    Mediator.on('note:over', this.onNoteOver);
    Mediator.on('note:out', this.onNoteOut);

    this.tl = new TimelineMax();

  }

  onInit() {
    this.onResize();

    this.$lines = this.$el.querySelectorAll('.Sheet-line');
    this.$notes = this.$el.querySelectorAll('.Note-point');

    this.tl.staggerFromTo(this.$lines, 1.2, { xPercent: -100 }, { xPercent: 0, ease: Expo.easeInOut }, 0.08, 0.1);
    this.tl.staggerFromTo(this.$notes, 0.6, { scale: 0 }, { scale: 1, ease: Cubic.easeOut }, 0.06, 0.8);
    this.tl.pause(0);

  }

  destroy() {
    resize.removeListener(this.onResize);

    super.destroy();
  }

  transitionIn() {
    this.tl.play(0);
  }

  onNoteOver(id) {
    this.refs[`title-${id}`].show();
  }

  onNoteOut(id) {
    this.refs[`title-${id}`].hide();
  }

  onResize() {
    const width = this.$container.offsetWidth;
    let h = 0;

    this.setNotesTop();

    for (let i = 0; i < 19; i++) {
      h = this.refs[`note-${(i + 1)}`].$point.getBoundingClientRect().top - this.refs[`title-${(i + 1)}`].$el.getBoundingClientRect().top;
      css(this.refs[`note-${(i + 1)}`].$el, { left: 0.053 * i * width });
      if (i >= 15) {
        css(this.refs[`title-${(i + 1)}`].$el, { left: 0.053 * i * width - 310 });
      } else {
        css(this.refs[`title-${(i + 1)}`].$el, { left: 0.053 * i * width - 28 });
      }
      this.refs[`title-${(i + 1)}`].setLineHeight(h);
    }
  }

  setNotesTop() {
    const firstLineTop = -21;
    const secondLineTop = 10;
    const thirdLineTop = 41;
    const fourthLineTop = 72;
    const fifthLineTop = 103;

    css(this.refs['note-1'].$el, { top: fifthLineTop });
    css(this.refs['note-2'].$el, { top: fourthLineTop });
    css(this.refs['note-3'].$el, { top: fourthLineTop });
    css(this.refs['note-4'].$el, { top: thirdLineTop });
    css(this.refs['note-5'].$el, { top: thirdLineTop });
    css(this.refs['note-6'].$el, { top: fifthLineTop });
    css(this.refs['note-7'].$el, { top: firstLineTop });
    css(this.refs['note-8'].$el, { top: thirdLineTop });
    css(this.refs['note-9'].$el, { top: fifthLineTop });
    css(this.refs['note-10'].$el, { top: secondLineTop });
    css(this.refs['note-11'].$el, { top: thirdLineTop });
    css(this.refs['note-12'].$el, { top: fourthLineTop });
    css(this.refs['note-13'].$el, { top: secondLineTop });
    css(this.refs['note-14'].$el, { top: fifthLineTop });
    css(this.refs['note-15'].$el, { top: thirdLineTop });
    css(this.refs['note-16'].$el, { top: fourthLineTop });
    css(this.refs['note-17'].$el, { top: thirdLineTop });
    css(this.refs['note-18'].$el, { top: fifthLineTop });
    css(this.refs['note-19'].$el, { top: fourthLineTop });
  }
}
