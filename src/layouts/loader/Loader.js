import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import Config from 'lib/Config';
import bindAll from 'lodash.bindAll';

export default class Loader extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'transitionIn', 'onInComplete', 'loadingComplete');

    this.visible = false;
    this.percent = 740;
    this.isLoaded = false;

    this.$h1 = this.$el.querySelector('h1');
    this.$text = this.$el.querySelector('.Intro-content > p');
    this.$loader = this.$el.querySelector('.Loader svg');
    this.$loaderContainer = this.$el.querySelector('.Loader');
    this.$textLoader = this.$el.querySelector('.Loader-container p');

    this.tl = new TimelineMax({ onComplete: this.onInComplete });
    this.tl.staggerFromTo([this.$h1, this.$text], 1.0,
      { y: -100, alpha: 0 },
      { y: 0, alpha: 1, ease: Expo.easeOut }, 0.08, 0.4);
    this.tl.staggerFromTo([this.$loaderContainer, this.$textLoader], 1.0,
      { y: 100, alpha: 0 },
      { y: 0, alpha: 1, ease: Expo.easeOut }, 0.08, 0.4);
    this.tl.to(this.$loader, 3.0,
      { strokeDasharray: 495, ease: Cubic.easeOut }, 0.9);
    this.tl.pause(0);

    this.tlOut = new TimelineMax({ onComplete: this.loadingComplete });
    this.tlOut.staggerTo([this.$h1, this.$text], 1.0,
      { y: -100, alpha: 0, ease: Expo.easeOut }, -0.08, 0.0);
    this.tlOut.staggerTo([this.$loaderContainer, this.$textLoader], 1.0,
      { y: 100, alpha: 0, ease: Expo.easeOut }, -0.08, 0.0);
    this.tlOut.pause(0);

    Mediator.on('loader:transitionIn', this.transitionIn);
  }

  transitionIn() {
    if (this.visible) { return; }

    this.$el.classList.add('noComplete');
    this.visible = true;

    if (!Config.get('previousRoute')) {
      this.tl.play(0);
    } else {
      this.loadingComplete();
    }
  }

  loadingComplete() {
    this.$el.classList.remove('noComplete');

    Mediator.emit('header:transitionIn');
    Mediator.emit('sheet:transitionIn');
    Mediator.emit('footer:transitionIn');
  }

  onInComplete() {
    this.isLoaded = true;
    this.tlOut.play(0);
  }
}
