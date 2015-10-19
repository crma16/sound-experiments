import Component from 'lib/components/Component';
import Mediator from 'lib/Mediator';
import Config from 'lib/Config';
import bindAll from 'lodash.bindall';

export default class View extends Component {
  constructor($el) {
    super($el);

    bindAll(this, 'onRoute', 'showFirstPage', 'oldPageHidden');

    this.currentPage;

    if (Config.get('isIE')) {
      this.showFirstPage();
    } else {
      Mediator.on('route:change:ready', this.onRoute);
      Mediator.once('route:change:first', this.showFirstPage);
    }
  }

  showFirstPage() {
    this.currentPage = this._componentInstances[0];

    if (!Config.get('isMobile')) {
      this.currentPage.transitionIn(this.firstPageShown);
    } else {
      this.firstPageShown();
    }
  }

  oldPageHidden() {
    this.currentPage = this.createSection(this.content.page);
    this._componentInstances[0].dispose();
    delete this._componentInstances[0];
    this._componentInstances.splice(0, 1);

    if (!Config.get('isMobile')) {
      this.currentPage.transitionIn(this.firstPageShown);
    } else {
      this.firstPageShown();
    }
  }

  firstPageShown() {
    Mediator.emit('route:change:done');
  }

  createSection(text) {
    let $node = document.createElement('div');
    $node.innerHTML = text;
    $node = $node.firstChild;

    this.$el.appendChild($node);
    $node = null;
    this.parse();

    return this._componentInstances[this._componentInstances.length - 1];
  }

  onRoute(path, id, content) {
    window.scrollTo(0, 0);
    this.content = content;

    if (this._componentInstances[0] && !Config.get('isMobile')) {
      this._componentInstances[0].transitionOut(this.oldPageHidden);
    } else {
      this.oldPageHidden();
    }
  }
}