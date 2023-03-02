AFRAME.registerComponent('grabbable', {
  schema: {
    target: { type: 'selector', default: '#camera-rig' },
    threshold: { type: 'number', default: 2 }
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
  
    // Check distance to camera rig every 100ms, and emit 'eaten' event if close enough
    this.interval = setInterval(function() {
      self.data.target.object3D.getWorldPosition(self.targetPos);
      self.el.object3D.getWorldPosition(self.pos);
      const distance = self.pos.distanceTo(self.targetPos);
      if (distance < self.data.threshold) {
        self.el.emit('eaten');
        clearInterval(self.interval);
      }
    }, 100);
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
