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
    'Loader': require('layouts/loader/Loader'),
    'View': require('layouts/view/View'),
    'Header': require('layouts/header/Header'),
    'Footer': require('layouts/footer/Footer'),
    /* Sections */
    'Home': require('sections/home/Home'),
    'About': require('sections/about/About'),
    'Project': require('sections/project/Project'),
    /* Components */
    'Sheet': require('components/sheet/Sheet'),
    'Note': require('components/note/Note'),
    'ProjectTitle': require('components/project-title/ProjectTitle'),
  });

  const rootComponent = new Component(document.body);
  ComponentManager.setRootComponent(rootComponent);
  rootComponent.parse();

  let router = new Router([
    'home',
    'about',
    'project/:name',
  ]);
});
