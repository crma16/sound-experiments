import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import bindAll from 'lodash.bindAll';

export default class Header extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'onRouteChange', 'transitionIn');

    this.$h1 = this.$el.querySelector('h1');
    this.$about = this.$el.querySelector('.Header-about');

    this.tl = new TimelineMax();
    this.tl.staggerFromTo([this.$h1, this.$about], 1.0, { y: -100, alpha: 0 }, { y: 0, alpha: 1, ease: Expo.easeOut }, 0.08, 0.4);
    this.tl.pause(0);

    Mediator.on('route:change:ready', this.onRouteChange);
    Mediator.on('header:transitionIn', this.transitionIn);
  }

  onInit() {}

  transitionIn() {
    this.tl.play(0);
  }

  onRouteChange(currentPath, currentPageId, content) {
    if (currentPath === 'home' || currentPath === 'about') {
      this.replaceContent(content.header);
    }
  }
}
