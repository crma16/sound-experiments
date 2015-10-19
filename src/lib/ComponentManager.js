class ComponentManager {
  constructor() {
    this.components = {};
  }

  register(componentName, componentClass) {
    this.components[componentName] = componentClass;
  }

  registerMultiple(componentList) {
    this.components = componentList;
  }

  get(componentName) {
    return this.components[componentName];
  }

  setRootComponent(rootComponent) {
    this.rootComponent = rootComponent;
  }

  getInstance(componentName) {
    const component = this.rootComponent.findInstance(componentName);

    if (component) { return component; }

    return console.error(`Couldn't find any instance of ${componentName}`);
  }
}

export default new ComponentManager();
