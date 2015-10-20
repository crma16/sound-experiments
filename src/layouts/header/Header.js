import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import bindAll from 'lodash.bindAll';

export default class Header extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'onRouteChange');

    Mediator.on('route:change:ready', this.onRouteChange);
  }

  onInit() {}

  onRouteChange(currentPath, currentPageId, content) {
    if (currentPath === 'home' || currentPath === 'about') {
      this.replaceContent(content.header);
    }
  }
}
