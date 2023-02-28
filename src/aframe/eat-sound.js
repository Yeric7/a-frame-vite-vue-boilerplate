AFRAME.registerComponent('eat-sound', {
    schema: {
      target: { type: 'selector', default: '#camera-rig' },
      sound: { type: 'selector' },
    },
    init: function () {
      this.el.addEventListener('mushroom-eaten', () => {
        const sound = this.data.sound;
        const target = this.data.target;
        const distance = this.el.object3D.position.distanceTo(target.object3D.position);
        const volume = 1 - Math.min(distance / 10, 1); // decrease volume as distance increases
  
        sound.setAttribute('volume', volume);
        sound.components['sound'].stop();
        sound.components['sound'].play();
      });
    },
  });