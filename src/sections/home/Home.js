import Section from 'lib/components/Section';
import Mediator from 'lib/Mediator';
import Config from 'lib/Config';
import bindAll from 'lodash.bindAll';


export default class Home extends Section {
  constructor($el) {
    super($el);

    bindAll(this, 'onNoteClick');

    this.$circle = this.$el.querySelector('.Home-circleTransition');
    this.tlOut = new TimelineMax();

    Mediator.on('note:click', this.onNoteClick);
    Mediator.emit('loader:transitionIn');
  }

  destroy() {
    Mediator.off('note:click', this.onNoteClick);
    super.destroy();
  }

  onInit() {}

  onNoteClick(x, y) {
    this.$circle.style.left = `${x}px`;
    this.$circle.style.top = `${y}px`;
  }

  transitionIn(callback) {
    super.transitionIn(callback);

    if (Config.get('previousRoute').indexOf('project') > -1 && Config.get('homeCircle')) {
      this.$circle.style.left = Config.get('homeCircle').x;
      this.$circle.style.top = Config.get('homeCircle').y;
      TweenMax.fromTo(this.$circle, 0.5, { scale: Config.get('homeCircle').scale }, { scale: 0, ease: Expo.easeOut }, 0);
    } else {
      if (Config.get('previousRoute') == 'about') {
        this.refs.sheet.transitionIn(); 
      }    
    }
  }


  transitionOut(callback) {
    if (Config.get('currentRoute').indexOf('project') > -1) {
      const scaleX = 2 * window.innerWidth / this.$circle.offsetWidth;
      const scaleY = 2 * window.innerHeight / this.$circle.offsetHeight;
      const s = Math.max(scaleX, scaleY);

      Config.set('homeCircle', {
        x: this.$circle.style.left,
        y: this.$circle.style.top,
        scale: s,
      });

      this.tlOut.eventCallback('onComplete', callback);
      this.tlOut.fromTo(this.$circle, 0.6, { scale: 0 }, { scale: s, ease: Expo.easeOut });
    } else {
      this.refs.sheet.transitionOut(callback);
    }
  }
}
