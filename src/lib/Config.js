import walk from 'dom-walk';
import config from 'config/app.json';
import classes from 'dom-classes';

class Config {
  constructor() {
    //  set values from config file
    this.values = config;
  }

  defineValues() {
    let name;

    // set values from meta
    walk(document.querySelector('head'), (node) => {
      if (node.nodeType === 1 && node.hasAttribute('name')) {
        name = node.getAttribute('name');
        if (name.indexOf('brindille') > -1) {
          this.values[name.replace('brindille:', '')] = node.getAttribute('content');
        }
      }
    });

    // set values from bofy classes
    this.values.isMobile = classes.has(document.body, 'mobile');
    this.values.isTablet = classes.has(document.body, 'tablet');
    this.values.isIE = classes.has(document.body, 'ie');

    // set locale
    this.values.lang = document.querySelector('html').getAttribute('lang');
  }

  get(key) {
    return this.values[key];
  }

  set(key, value) {
    this.values[key] = value;
  }
}

export default new Config();
