import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import Config from 'lib/Config';
import bindAll from 'lodash.bindAll';

export default class Loader extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'transitionIn', 'loading', 'loadingComplete');

    this.visible = false;
    this.percent = 740;
    this.isLoaded = false;

    this.$h1 = this.$el.querySelector('h1');
    this.$text = this.$el.querySelector('.Intro-content > p');
    this.$loader = this.$el.querySelector('.Loader svg');
    this.$loaderContainer = this.$el.querySelector('.Loader');
    this.$textLoader = this.$el.querySelector('.Loader-container p');

    this.tl = new TimelineMax();
    this.tl.staggerFromTo([this.$h1, this.$text], 1.0, { y: -100, alpha: 0 }, { y: 0, alpha: 1, ease: Expo.easeOut }, 0.08, 0.4);
    this.tl.staggerFromTo([this.$loaderContainer, this.$textLoader], 1.0, { y: 100, alpha: 0 }, { y: 0, alpha: 1, ease: Expo.easeOut }, 0.08, 0.4);
    this.tl.pause(0);

    this.tlOut = new TimelineMax();
    this.tlOut.staggerTo([this.$h1, this.$text], 1.0, { y: -100, alpha: 0, ease: Expo.easeOut }, -0.08, 0.0);
    this.tlOut.staggerTo([this.$loaderContainer, this.$textLoader], 1.0, { y: 100, alpha: 0, ease: Expo.easeOut }, -0.08, 0.0);
    this.tlOut.pause(0);

    Mediator.on('loader:transitionIn', this.transitionIn);
  }

  onInit() {}

  transitionIn() {
    if (this.visible) { return; }

    this.$el.classList.add('noComplete');

    if (!Config.get('previousRoute')) {
      this.tl.play(0);
      setInterval(this.loading, 100);
    } else {
      this.loadingComplete();
    }

    this.visible = true;

  }

  loading() {
    if (this.percent >= 500) {
      this.percent -= Math.floor(Math.random() * (10 - 1)) + 1;
      this.$loader.style.strokeDasharray = this.percent;
    } else if (this.isLoaded === false) {
      this.isLoaded = true;
      this.tlOut.play(0);
      // TODO: plug to real loader
      setTimeout(this.loadingComplete, 300);
    }
  }

  loadingComplete() {
    this.$el.classList.remove('noComplete');

    Mediator.emit('header:transitionIn');
    Mediator.emit('sheet:transitionIn');
    Mediator.emit('footer:transitionIn');
  }
}
