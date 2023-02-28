AFRAME.registerComponent('grabbable', {
  schema: {
    target: {type: 'selector', default: '#camera-rig'},
    eatSound: {type: 'selector', default: ''},
    map: {type: 'selector', default: ''},
  },
  init: function () {
    this.initialPos = {...this.el.object3D.position};
    this.targetPos = new THREE.Vector3();
    this.targetRot = new THREE.Quaternion();
    this.pos = new THREE.Vector3();
    this.rot = new THREE.Quaternion();
    this.target = null;
    this.eaten = false;
    this.el.addEventListener('click', evt => this.grab(evt));
  },
  grab: function (evt) {
    this.target = this.data.target;
    const boundingBox = new THREE.Box3().setFromObject(this.el.object3D);
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    this.el.object3D.position.copy(center);
    this.el.object3D.scale.set(0.25, 0.25, 0.25);
  },
  reset: function () {
    this.el.object3D.position.set(this.initialPos.x, this.initialPos.y, this.initialPos.z);
  },
  tick: function () {
    if (this.target === null) return;

    this.data.target.object3D.getWorldPosition(this.targetPos);

    this.el.object3D.position.copy(this.targetPos);
    this.el.object3D.rotation.copy(this.data.target.object3D.rotation);

    // Check if the mushroom is colliding with the camera rig
    const mushroomBB = new THREE.Box3().setFromObject(this.el.object3D);
    const cameraBB = new THREE.Box3().setFromObject(this.data.target.object3D);
    if (mushroomBB.intersectsBox(cameraBB)) {
      if (!this.eaten) {
        this.eaten = true;
        if (this.data.eatSound) this.data.eatSound.components.sound.play();
        if (this.data.map) {
          setTimeout(() => {
            const mapPos = this.data.map.object3D.position;
            this.data.map.setAttribute('animation', `property: position; to: ${mapPos.x} ${mapPos.y} ${mapPos.z + 10}; dur: 5000`);
          }, 5000);
        }
      }
    }
  }
});
