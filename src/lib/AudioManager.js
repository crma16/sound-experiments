class AudioManager {
  constructor() {
    this.sounds = [];
  }

  load(sounds) {
    sounds.forEach((sound) => {
      this.sounds[sound.id] = new Audio();
      this.sounds[sound.id].preload = 'auto';
      this.sounds[sound.id].src = sound.src;
    });
  }

  getSound(id) {
    return this.sounds[id];
  }
}

export default new AudioManager();