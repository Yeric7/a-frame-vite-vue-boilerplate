<script setup>
  import { ref } from 'vue';
  import '../aframe/disable-in-vr.js';
  import '../aframe/hide-in-vr.js';
  import '../aframe/simple-navmesh-constraint.js';
  import '../aframe/blink-controls.js';

/*   const scale = ref([1, 1, 1]);
  const rotation = ref([0, 0, 0]);
  const delay = ref(0);

  setInterval(() => {
    scale.value = [getRandomFloat(1, 1.5), getRandomFloat(1, 1.5), getRandomFloat(1, 1.5)];
    rotation.value = [getRandomFloat(0, 0.2), getRandomFloat(0, 0.2), getRandomFloat(0, 0.2)];
    delay.value = getRandomInt(0, 5000);
  }, 5000);

  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } */
</script>

<template>
  <!-- <a-entity
    id="camera-rig"
    position="0 0.6 -5"
    geometry="primitive: box"
    material="color: blue"
    :animation__scale="`property: scale; dur: 500; easing: easeInOutSine; dir: alternate; loop: true; to: ${scale.value.join(' ')}; delay: ${delay.value}`"
    :animation__rotation="`property: rotation; dur: 3000; easing: easeInOutSine; dir: alternate; loop: true; to: ${rotation.value.join(' ')}; delay: ${delay.value + 2000}`"
    movement-controls="camera: #head; speed: 0.6;"
  >
 -->
 <a-entity
    id="camera-rig"
    movement-controls="camera: #head; speed: 0.6;"
    disable-in-vr="component: movement-controls;"
  >
        

      <a-entity
        id="head"
        look-controls="pointerLockEnabled: true"
       simple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.65;"
        disable-in-vr="component: simple-navmesh-constraint;"
        camera
        position="-6 1.7 -10"
      >
        <a-entity
          geometry="primitive: circle; radius: 0.0003;"
          material="shader: flat; color: white;"
          cursor
          raycaster="far: 2; objects: [clickable]; showLine: false;"
          position="0 0 -0.1"
          disable-in-vr="component: raycaster; disableInAR: false;"
          hide-in-vr="hideInAR: false"
        ></a-entity>
      </a-entity>

      <a-entity
        id="hand-left"
        hand-controls="hand: left"
        blink-controls="
          cameraRig: #camera-rig;
          teleportOrigin: #head;
          collisionEntities: [data-role='nav-mesh'];
          snapTurn: false;
        "
      ></a-entity>

      <a-entity
        id="hand-right"
        hand-controls="hand: right"
        laser-controls="hand: right"
        raycaster="far: 2; objects: [clickable]; showLine: true;"
      ></a-entity>

      

  </a-entity>
</template>