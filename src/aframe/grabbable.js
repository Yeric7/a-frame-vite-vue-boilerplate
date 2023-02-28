AFRAME.registerComponent('grabbable', {
  schema: {
    target: {type: 'selector', default: '#camera-rig'},
    scale: {type: 'number', default: 0.5},
  },
  init: function () {
    this.initialPos = {...this.el.object3D.position};
    this.targetPos = new THREE.Vector3();
    this.targetRot = new THREE.Quaternion();
    this.pos = new THREE.Vector3();
    this.rot = new THREE.Quaternion();
    this.target = null;
    this.el.addEventListener('click', evt => this.grab(evt));
  },
  grab: function (evt) {
    this.target = this.data.target;
    const boundingBox = new THREE.Box3().setFromObject(this.el.object3D);
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    this.el.object3D.position.copy(center);
    this.el.object3D.scale.set(this.data.scale, this.data.scale, this.data.scale);
  },
  reset: function () {
    this.el.object3D.position.set(this.initialPos.x, this.initialPos.y, this.initialPos.z);
    this.el.object3D.scale.set(1, 1, 1);
  },
  tick: function () {
    if (this.target === null) return;
    this.data.target.object3D.getWorldPosition(this.targetPos);
    this.el.object3D.position.copy(this.targetPos);
    this.el.object3D.rotation.copy(this.data.target.object3D.rotation);
  }
});
