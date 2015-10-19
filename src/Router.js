import page from 'page';
import bindAll from 'lodash.bindall';
import Mediator from 'lib/Mediator';
import Config from 'lib/Config';

export default class Router {
  constructor(routes, defaultRoute) {
    if (Config.get('isIE')) {
      Config.set('currentRoute', window.page);
      return;
    }
    this.currentPath = '';
    this.previousPath = '';
    this.previousPageId = '';
    this.currentPageId = '';
    this.isFirstRoute = true;
    this.isReady = true;
    this.defaultRoute = defaultRoute || routes[0];
    this.routes = [''].concat(routes);

    bindAll(this, 'loadRoute', 'routeLoaded', 'routeCompleted', 'notFoundController');

    this.routes.forEach((value) => {
      page('/' + value, this.loadRoute, this.routeLoaded, this.routeCompleted);
    });
    page('*', this.notFoundController);

    if (Config.get('baseUrl')) {
      page.base(Config.get('baseUrl'));
    }

    page.start();
  }

  /* ========================================================
    Utils
  ======================================================== */
  getPageId(path) {
    const id = path === undefined ? '' : path.split('/')[1];

    return id;
  }

  getPath(context) {
    const id = context.path.replace('/', '');

    return id === '' ? this.defaultRoute : id;
  }

  /* ========================================================
    Not found / Default route
  ======================================================== */
  notFoundController(context) {
    if (this.routes.indexOf(this.getPageId(this.getPath(context))) < 0) {
      page('/' + this.defaultRoute);
    }
  }

  /* ========================================================
    Route Methods
  ======================================================== */
  loadRoute(context, next) {
    this.isReady = false;

    const currentPath = this.getPath(context);

    this.previousPath = this.currentPath;
    this.currentPath = currentPath;
    this.previousPageId = this.getPageId(this.previousPath);
    this.currentPageId = this.getPageId(this.currentPath);

    Config.set('currentRoute', this.currentPageId);
    Config.set('previousRoute', this.previousPageId);

    Mediator.emit('route:change:start', this.currentPath, this.isFirstRoute);
    Mediator.off('route:change:done');

    if (this.isFirstRoute) {
      Mediator.once('route:change:done', next);
      Mediator.emit('route:change:first', this.currentPath, this.currentPageId);
      return;
    }

    fetch(Config.get('rootUrl') + '?c=1&p=/' + this.currentPath)
      .then((response) => {
        // parse JSON
        return response.json();
      }).then((data) => {
        this.content = data;
        next();
      });
  }

  routeLoaded(context, next) {
    if (this.isFirstRoute) {
      this.isFirstRoute = false;
      return next();
    }
    Mediator.once('route:change:done', next);
    Mediator.emit('route:change:ready', this.currentPath, this.currentPageId, this.content);
  }

  routeCompleted() {
    this.isReady = true;
  }
}