<script setup>
import { ref, onMounted, getCurrentInstance  } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import TheNavMesh from "./TheNavMesh.vue";
import TheMainRoom from "./TheMainRoom.vue";
import TheLifeCubeRoom from "./TheLifeCubeRoom.vue";

import "../aframe/animation-mixer";
import "../aframe/life-like-automaton.js";
import "../aframe/teleport-camera-rig.js";
import "../aframe/grabbable.js";


defineProps({
  scale: Number,
  overlaySelector: String,
});

const allAssetsLoaded = ref(false);
const eatSoundLoaded = ref(false);

const eatSound = new Audio();
eatSound.src = "assets/mushroomSon.mp3";
eatSound.addEventListener("canplaythrough", () => {
  eatSoundLoaded.value = true;
});

const onMushroomGrabbed = () => {
  // Do something when the mushroom is grabbed
  console.log('Mushroom grabbed!');
}

const onMushroomEaten = () => {
  // Do something when the mushroom is eaten
  console.log('Mushroom eaten!');

  if (eatSoundLoaded.value) {
    eatSound.play();
  } else {
    console.log("Sound not loaded yet. It will be played once it finished loading.");
  }

  // Get the map entity and move it
  const mapEntity = instance.refs.mapEntity;
mapEntity.setAttribute('animation', {
  property: 'position',
  to: '0 0 -1155',
  dur: 10000,
  easing: 'linear',
  delay: 2000
});
}

let instance;

onMounted(() => {
  instance = getCurrentInstance();
});

console.log('animation terminée');
</script>



<template>
  <a-scene background="color: black;" renderer="colorManagement: true;" sound>
    <a-assets @loaded="allAssetsLoaded = true">
     
      <a-asset-item id="room" src="assets/vr_gallery.glb"></a-asset-item>

      <a-asset-item id="map1" src="assets/MapForestChampi.glb"></a-asset-item>
      <a-asset-item id="map2" src="assets/MapAvecAnimaux.glb"></a-asset-item>
      <a-asset-item id="map3" src="assets/ilo.glb"></a-asset-item>
      <a-asset-item id="mushroom" src="assets/glowing_mushroom.glb" ></a-asset-item>
     <!--  <audio id="eat-sound" src="assets/mushroomSon.mp3"></audio> -->
     <a-assets-item v-if="eatSoundLoaded" id="eat-sound" src="#eat-sound"></a-assets-item>
    </a-assets>

    <a-entity
  v-if="allAssetsLoaded"
  gltf-model="#map1"
  rotation="0 90 0"
  position="0 0 -5"
  scale="1 1.1 1"
  ref="mapEntity"
></a-entity>


    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#map2"
      rotation="0 90 0"
      position="50 -1 -55"
      scale="1 1.1 1"
      animation-mixer
    ></a-entity>

    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#map3"
      rotation="0 90 0"
      position="0 0 -5"
      scale="1 1.1 1"
    >
    </a-entity>

    <a-entity
  v-if="allAssetsLoaded"
  gltf-model="#mushroom"
  position="-6.633 0.5 -13.754"
  scale="0.5 0.5 0.5"
  animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
  id="mushroom-entity"
  grabbable="target: #hand-right;"
  clickable
  v-on:grabbed="onMushroomGrabbed"
  v-on:eaten="onMushroomEaten"
  sound="src: #eat-sound; on: eaten"
></a-entity>




    <!-- animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
 -->
    <TheNavMesh />

    <TheCameraRig />
  </a-scene>
</template>

