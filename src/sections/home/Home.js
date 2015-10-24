import Section from 'lib/components/Section';
import Mediator from 'lib/Mediator';
import Config from 'lib/Config';

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

  transitionOut(callback) {
    if (Config.get('currentRoute') === 'about') {
      this.refs.sheet.transitionOut(callback);
    } else if (Config.get('currentRoute').indexOf('project') > -1) {
      super.transitionOut(callback);
      console.log('go to project');
    }
  }
}
