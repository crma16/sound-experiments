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
    const firstLineHeight = 135;
    const secondLineTop = 10;
    const secondLineHeight = 167;
    const thirdLineTop = 41;
    const thirdLineHeight = 197;
    const fourthLineTop = 72;
    const fourthLineHeight = 228;
    const fifthLineTop = 103;
    const fifthLineHeight = 260;
    const width = this.$container.offsetWidth;

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

    this.refs['title-1'].setLineHeight(fifthLineHeight);
    this.refs['title-2'].setLineHeight(fourthLineHeight);
    this.refs['title-3'].setLineHeight(fourthLineHeight);
    this.refs['title-4'].setLineHeight(thirdLineHeight);
    this.refs['title-5'].setLineHeight(thirdLineHeight);
    this.refs['title-6'].setLineHeight(fifthLineHeight);
    this.refs['title-7'].setLineHeight(firstLineHeight);
    this.refs['title-8'].setLineHeight(thirdLineHeight);
    this.refs['title-9'].setLineHeight(fifthLineHeight);
    this.refs['title-10'].setLineHeight(secondLineHeight);
    this.refs['title-11'].setLineHeight(thirdLineHeight);
    this.refs['title-12'].setLineHeight(fourthLineHeight);
    this.refs['title-13'].setLineHeight(secondLineHeight);
    this.refs['title-14'].setLineHeight(fifthLineHeight);
    this.refs['title-15'].setLineHeight(thirdLineHeight);
    this.refs['title-16'].setLineHeight(fourthLineHeight);
    this.refs['title-17'].setLineHeight(thirdLineHeight);
    this.refs['title-18'].setLineHeight(fifthLineHeight);
    this.refs['title-19'].setLineHeight(fourthLineHeight);

    for (let i = 0; i < 19; i++) {
      css(this.refs[`note-${(i + 1)}`].$el, { left: 0.053 * i * width });
      css(this.refs[`title-${(i + 1)}`].$el, { left: 0.053 * i * width - 28 });
    }
  }
}
