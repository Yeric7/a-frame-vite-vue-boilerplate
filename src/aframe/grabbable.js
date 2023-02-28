AFRAME.registerComponent('grabbable', {
  schema: {
    target: { type: 'selector', default: '#camera-rig' },
  },
  init: function () {
    this.initialPos = { ...this.el.object3D.position };
    this.targetPos = new THREE.Vector3();
    this.targetRot = new THREE.Quaternion();
    this.pos = new THREE.Vector3();
    this.rot = new THREE.Quaternion();
    this.target = null;
    this.el.addEventListener('click', (evt) => this.grab(evt));
  },
  grab: function (evt) {
    this.target = this.data.target;
  
    // Scale down the object
    this.el.object3D.scale.set(0.1, 0.1, 0.1);
  
    // Emit a custom event
    this.el.emit('grabbed');
  
    // Save a reference to this component for use in the callback
    const self = this;
  
    // Wait 2 seconds and then emit another custom event to simulate the mushroom being eaten
    setTimeout(function() {
      self.el.emit('eaten');
    }, 2000);
  },
  
  reset: function () {
    this.el.object3D.position.set(
      this.initialPos.x,
      this.initialPos.y,
      this.initialPos.z
    );
  },
  tick: function () {
    if (this.target === null) return;

    this.data.target.object3D.getWorldPosition(this.targetPos);

    this.el.object3D.position.copy(this.targetPos);
    this.el.object3D.rotation.copy(this.data.target.object3D.rotation);
  },
});
