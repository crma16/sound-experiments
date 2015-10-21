import Component from 'lib/components/Component';

export default class Note extends Component {
  constructor($el) {
    super($el);

    this.$point = this.$el.querySelector('.Note-point');
  }
}
