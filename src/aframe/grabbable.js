AFRAME.registerComponent('grabbable', {
  schema: {
    target: {type: 'selector', default: '#camera-rig'},
    offset: {type: 'vec3', default: {x: 0, y: 0.5, z: 0.1}}
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
  },

  reset: function () {
    this.el.object3D.position.set(this.initialPos.x, this.initialPos.y, this.initialPos.z);
  },

  tick: function () {
    if (this.target === null) return;
    // calculate distance to target
    this.data.target.object3D.getWorldPosition(this.targetPos);
    // offset the grab position based on the asset dimensions
    const assetBox = new THREE.Box3().setFromObject(this.el.object3D);
    const assetSize = assetBox.getSize(new THREE.Vector3());
    this.targetPos.add(new THREE.Vector3(
      this.data.offset.x * assetSize.x,
      this.data.offset.y * assetSize.y,
      this.data.offset.z * assetSize.z
    ));
    // and copy rotation
    this.el.object3D.position.copy(this.targetPos);
    this.el.object3D.rotation.copy(this.data.target.object3D.rotation);
  }
});