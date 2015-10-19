import walk from 'dom-walk';
import componentManager from 'lib/ComponentManager';

export default class Component {
  constructor($el) {
    this.$el = $el;
    this.componentName = '';
    this.parent = null;
    this.refs = {};
    this._componentInstances = [];
  }

  /*
   * Parse template and instanciate sub-components
   */
  parse() {
    walk(this.$el, (node) => {
      const componentName = node && node.getAttribute ? node.getAttribute('data-component') : '';
      let Ctor;
      let component;
      let ref;

      if (node.nodeType === 1 && node.getAttribute('data-component')) {
        Ctor = componentManager.get(componentName);
        if (Ctor) {
          node.removeAttribute('data-component');
          component = new Ctor(node);
          component.parent = this;
          component.componentName = componentName;
          this._componentInstances.push(component);

          ref = node.getAttribute('data-ref');
          if (ref) {
            this.refs[ref] = component;
          }

          // parse to instanciate children
          component.parse();
        } else {
          console.error(`Can not find component ${componentName}`);
        }
      }
    });

    this.onInit();
  }

  /* =======================================================
   UTILS
   ========================================================*/
  findInstance(componentName) {
    let instance = this._componentInstances.filter(value => value.componentName === componentName);
    if (instance && instance.length) { return instance[0]; }

    for (let i = 0, l = this._componentInstances.length; i < l; i++) {
      instance = this._componentInstances[i].findInstance(componentName);

      if (instance !== undefined) { return instance; }
    }

    return undefined;
  }

  findAllInstances(componentName) {
    let instances = this._componentInstances.filter(value => value.componentName === componentName);
    let instance;

    if (instances && instances.length) { return instances; }

    instances = [];
    for (let i = 0, l = this._componentInstances.length; i < l; i++) {
      instance = this._componentInstances[i].findInstance(componentName);
      if (instance !== undefined) {
        instances.push(instance);
      }
    }

    return instances;
  }

  /* =======================================================
   LIFECYCLE
   ========================================================*/
  /*
   * onInit is called when the component is initialized
   */
  onInit() {}

  disposeChildren() {
    this._componentInstances.forEach((component) => {
      component.dispose();
    });
    this._componentInstances = [];
    this.refs = {};
  }

  dispose() {
    this.disposeChildren();
    this.destroy();
  }

  destroy() {
    if (this.parent && this.$el.parentNode && this.$el.parentNode === this.parent.$el) {
      this.parent.$el.removeChild(this.$el);
    }
    this.parent = null;
    this.$el = null;
  }
}
