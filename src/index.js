import 'style/main.styl';

import Component from 'lib/components/Component';
import ComponentManager from 'lib/ComponentManager';
import AudioManager from 'lib/AudioManager';
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
    'WebglBackground': require('layouts/webgl-background/WebglBackground'),
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

  AudioManager.load([
    { id: 'note_1', src: '/assets/mp3/notes/note_1.wav' },
    { id: 'note_2', src: '/assets/mp3/notes/note_2.wav' },
    { id: 'note_3', src: '/assets/mp3/notes/note_3.wav' },
    { id: 'note_4', src: '/assets/mp3/notes/note_4.wav' },
    { id: 'note_5', src: '/assets/mp3/notes/note_5.wav' },
  ]);

  const r = new Router([
    'home',
    'about',
    'project/:name',
  ]);
});
