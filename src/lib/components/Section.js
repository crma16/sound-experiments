import Component from './Component';
import classes from 'dom-classes';

export default class Section extends Component {
  constructor($el) {
    super($el);
  }

  transitionIn(callback) {
    callback();
    classes.remove(this.$el, 'hidden');
  }

  transitionOut(callback) {
    callback();
  }
}
