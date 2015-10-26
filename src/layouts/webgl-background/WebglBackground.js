import Component from 'lib/components/Component';
import Webgl from './Webgl';
import resize from 'brindille-resize';
import bindAll from 'lodash.bindAll';
import raf from 'raf';

export default class WebglBackground extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'onResize', 'update');

    this.webgl = new Webgl(resize.width, resize.height);
    this.$el.appendChild(this.webgl.renderer.domElement);

    resize.addListener(this.onResize);

    this.update();
  }

  update() {
    raf(this.update);

    this.webgl.render();
  }

  onResize() {
    this.webgl.resize(resize.width, resize.height);
  }
}
