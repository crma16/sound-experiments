import Component from 'lib/components/Component';
import bindAll from 'lodash.bindAll';
import resize from 'brindille-resize';
import css from 'component-css';

export default class Sheet extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'onResize');

    this.$container = this.$el.querySelector('.Sheet-note-container');

    resize.addListener(this.onResize);
  }

  onInit() {
    this.onResize();
  }

  destroy() {
    resize.removeListener(this.onResize);

    super.destroy();
  }

  onResize() {
    const firstLineTop = -21;
    const secondLineTop = 10;
    const thirdLineTop = 41;
    const fourthLineTop = 72;
    const fifthLineTop = 103;
    const width = this.$container.offsetWidth;
    let h = 0;

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
}
