import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import Webgl from './Webgl';
import resize from 'brindille-resize';
import bindAll from 'lodash.bindAll';
import raf from 'raf';

export default class WebglBackground extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'onResize', 'update', 'onProjectOpen', 'onProjectClose');

    this.r;
    this.webgl = new Webgl(resize.width, resize.height);
    this.$el.appendChild(this.webgl.renderer.domElement);

    resize.addListener(this.onResize);

    Mediator.on('project:open', this.onProjectOpen);
    Mediator.on('project:close', this.onProjectClose);

    this.update();
  }

  onProjectOpen() {
    raf.cancel(this.r);
  }

  onProjectClose() {
    this.update();
  }

  update() {
    this.r = raf(this.update);

    this.webgl.render();
  }

  onResize() {
    this.webgl.resize(resize.width, resize.height);
  }
}
