import 'style/main.styl';

import Component from 'lib/components/Component';
import ComponentManager from 'lib/ComponentManager';
import Config from 'lib/Config';
import Router from './Router';
import domready from 'domready';
import 'gsap';

domready(() => {
  Config.defineValues();

  ComponentManager.registerMultiple({
    /* Layouts */
    'View': require('layouts/view/View'),
    'Header': require('layouts/header/Header'),
    /* Sections */
    'Home': require('sections/home/Home'),
    'About': require('sections/about/About'),
    /* Components */
    'Sheet': require('components/sheet/Sheet'),
    'Note': require('components/note/Note'),
  });

  const rootComponent = new Component(document.body);
  ComponentManager.setRootComponent(rootComponent);
  rootComponent.parse();

  let router = new Router([
    'home',
    'about',
  ]);

});
