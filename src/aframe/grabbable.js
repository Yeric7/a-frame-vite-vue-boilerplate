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
    },
    reset: function () {
      this.el.object3D.position.set(this.initialPos.x, this.initialPos.y, this.initialPos.z);
    },
    tick: function () {
      if (this.target === null) return;
      // calculate distance to target
      // this.data.target.object3D.getWorldPosition(this.targetPos);
      // this.el.object3D.getWorldPosition(this.pos);
      // this.pos.sub(this.targetPos);
      // // apply the calcultated distance to the entity
      // this.el.object3D.position.sub(this.pos);
      // and copy rotation
      this.el.object3D.position.copy(this.data.target.object3D.position);
      this.el.object3D.rotation.copy(this.data.target.object3D.rotation);
    }
  });