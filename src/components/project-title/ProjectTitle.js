import Component from 'lib/components/Component';

export default class ProjectTitle extends Component {
  constructor($el) {
    super($el);

    this.isVisible = false;
    this.$line = this.$el.querySelector('.ProjectTitle-line');
  }

  show() {
    this.isVisible = true;
    this.$el.style.display = '';
  }

  hide() {
    this.isVisible = false;
    this.$el.style.display = 'none';
  }

  setLineHeight(value) {
    this.$line.style.height = `${value}px`;
  }
}