import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import bindAll from 'lodash.bindAll';
import classes from 'dom-classes';

export default class Footer extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'transitionIn', 'onRouteChange');

    Mediator.on('footer:transitionIn', this.transitionIn);
    Mediator.on('route:change:ready', this.onRouteChange);

    this.visible = false;

    this.tl = new TimelineMax();
    this.tl.staggerFromTo(this.$el.querySelectorAll('.Footer-social li, .Footer-about'), 0.8, { y: 100, alpha: 0 }, { y: 0, alpha: 1, ease: Expo.easeOut }, 0.08, 0.7);
    this.tl.pause(0);
  }

  onInit() {}

  transitionIn() {
    if (this.visible) { return; }

    classes.remove(this.$el, 'hidden');
    this.tl.play(0);
    this.visible = true;
  }

  onRouteChange(currentPath, currentPageId, content) {


    if (currentPath === 'home' || currentPath === 'about') {
      this.replaceContent(content.footer);
    }
  }
}