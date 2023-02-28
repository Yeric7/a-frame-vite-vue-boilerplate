AFRAME.registerComponent('grabbable', {
  schema: {
    target: {type: 'selector', default: '#camera-rig'},
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
    this.el.object3D.scale.set(0.5, 0.5, 0.5);
  },
  reset: function () {
    this.el.object3D.position.set(this.initialPos.x, this.initialPos.y, this.initialPos.z);
    this.el.object3D.scale.set(1, 1, 1);
  },
  tick: function () {
    if (this.target === null) return;
    // calculate distance to target
    this.data.target.object3D.getWorldPosition(this.targetPos);
    // apply the calculated distance to the entity
    this.el.object3D.position.copy(this.targetPos);
    this.el.object3D.rotation.copy(this.data.target.object3D.rotation);
  }
});