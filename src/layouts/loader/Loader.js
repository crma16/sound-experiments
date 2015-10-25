import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import bindAll from 'lodash.bindAll';

export default class Loader extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'transitionIn');

    this.visible = false;
    this.percent = 740;
    this.isLoad = false;

    this.$intro = this.$el;
    this.$h1 = this.$el.querySelector('h1');
    this.$text = this.$el.querySelector('.Intro-content > p');

    this.$loader = this.$el.querySelector('.Loader svg');

    this.$LoaderContainer = this.$el.querySelector('.Loader');
    this.$textLoader = this.$el.querySelector('.Loader-container p');

    this.tl = new TimelineMax();
    this.tl.staggerFromTo([this.$h1, this.$text], 1.0, { y: -100, alpha: 0 }, { y: 0, alpha: 1, ease: Expo.easeOut }, 0.08, 0.4);
    this.tl.staggerFromTo([this.$LoaderContainer, this.$textLoader], 1.0, { y: 100, alpha: 0 }, { y: 0, alpha: 1, ease: Expo.easeOut }, 0.08, 0.4);

    this.tl.pause(0);

    Mediator.on('loader:transitionIn', this.transitionIn);
  }

  onInit() {}

  transitionIn() {
    if (this.visible) { return; }
    this.$intro.classList.add('noComplete');

    this.tl.play(0);
    this.visible = true;
 
    setInterval(this.loading, 100, this); 
  }

  loading ($this) {
    if ($this.percent >= 500) {
      $this.percent -= Math.floor(Math.random() * (10 - 1)) + 1;
      $this.$loader.style.strokeDasharray = $this.percent;
    } else if ($this.isLoad == false) {
      $this.isLoad = true;
      $this.tl.reverse(0, false);
      $this.loadingComplete ();
      $this.$intro.classList.remove('noComplete');
    }
  }

  loadingComplete () {
    Mediator.emit('header:transitionIn');
    Mediator.emit('sheet:transitionIn');
    Mediator.emit('footer:transitionIn');
  }
}
