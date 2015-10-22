import Section from 'lib/components/Section';
import Mediator from 'lib/Mediator';

export default class Home extends Section {
  constructor($el) {
    super($el);
  }

  onInit() {}

  transitionIn(callback) {
    super.transitionIn(callback);
    this.refs.sheet.transitionIn();
    Mediator.emit('header:transitionIn');
    Mediator.emit('footer:transitionIn');
  }
}
