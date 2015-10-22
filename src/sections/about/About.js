import Section from 'lib/components/Section';
import Mediator from 'lib/Mediator';

export default class About extends Section {
  constructor($el) {
    super($el);
  }

  onInit() {}

  transitionIn(callback) {
    super.transitionIn(callback);
    Mediator.emit('header:transitionIn');
    Mediator.emit('footer:transitionIn');
  }
}
