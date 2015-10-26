import Wave from './objects/Wave';
import THREE from 'three';
window.THREE = THREE;

export default class Webgl {
  constructor(width, height) {
    this.scene = new THREE.Scene();

    this.params = {
      postprocessing: false,
    };

    this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x262626);

    // this.composer = new WAGNER.Composer(this.renderer);
    // this.composer.setSize(width, height);
    this.initPostprocessing();

    this.wave = new Wave();
    this.wave.position.set(0, 0, 0);
    this.scene.add(this.wave);
  }

  initPostprocessing() {
    if (!this.params.postprocessing) { return; }

    // this.vignette2Pass = new WAGNER.Vignette2Pass();
  }

  resize(width, height) {
    // this.composer.setSize(width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  render() {
    if (this.params.postprocessing) {
      // this.composer.reset();
      // this.composer.renderer.clear();
      // this.composer.render(this.scene, this.camera);
      // this.composer.pass(this.vignette2Pass);
      // this.composer.toScreen();
    } else {
      this.renderer.autoClear = false;
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);
    }

    this.wave.update();
  }
}