<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";

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
  console.log("Mushroom grabbed!");
};

const loopScale = (el) => {
  AFRAME.ANIME({
    targets: '#camera-rig',
      // scale: () => `${AFRAME.ANIME.random(0.99, 1)} ${AFRAME.ANIME.random(1,1)} ${AFRAME.ANIME.random(1, 1)}`,
      // scale: '1.1 1 1',
      // rotation: '0 1 0',
      rotation: () => `${AFRAME.ANIME.random(0.99, 1)} ${AFRAME.ANIME.random(0,1)} ${AFRAME.ANIME.random(1, 1)}`,
      easing: 'easeInOutSine',
      direction: 'alternate',
      loop: true,
    duration: 1000,

  });

  
};

const onMushroomEaten = () => {
  // Do something when the mushroom is eaten
  console.log("Mushroom eaten!");

  if (eatSoundLoaded.value) {
    eatSound.play();
  } else {
    console.log(
      "Sound not loaded yet. It will be played once it finished loading."
    );
  }

  // Get the map entity and move it
  const mapEntity = instance.refs.mapEntity;
  const mapEntity2 = instance.refs.mapEntity2;

// Move to first position
mapEntity.setAttribute("animation", {
  property: "position",
  to: "0 0 -1155",
  dur: 2000,
  easing: "linear",
  delay: 2000,
});

// Wait for the animation to complete and then move to second position
setTimeout(() => {
  mapEntity.setAttribute("animation", {
    property: "position",
    to: "0 -10000 -1155",
    dur: 100,
    easing: "linear",
  }  );
}, 2500); 

   // Get the 2map entity and move it
  mapEntity2.setAttribute("animation", {
    property: "position",
    to: "0 0 -5",
    dur: 2500,
    easing: "linear",
    delay: 200,
  });

  // Get the camera rig entity and scale it
  const cameraRigEntity = document.querySelector("#camera-rig");
  cameraRigEntity.setAttribute("scale", "1. 1 1");
  loopScale(cameraRigEntity);
};

let instance;

onMounted(() => {
  instance = getCurrentInstance();
});

console.log("animation terminée");
</script>




<template>
  <a-scene  renderer="colorManagement: true;" sound >

    
    <!-- fog="type: linear; color: #DFE4E6" -->
    <a-assets @loaded="allAssetsLoaded = true">
      <!--
        Title: Yeric VR
        Model source:
        Map: "The Living Forest" (https://skfb.ly/69WTw) by proxy_doug / (http://creativecommons.org/licenses/by/4.0/).
        Object : 
        "Stylized mushrooms" (https://skfb.ly/orrFy) by QumoDone / (http://creativecommons.org/licenses/by/4.0/)
        "Musical Notes" (https://skfb.ly/oxIVp) by Gustavo.Fabi / (http://creativecommons.org/licenses/by/4.0/)
        "Glowing Mushroom" (https://skfb.ly/otXoo) by rabbiturnal / (http://creativecommons.org/licenses/by/4.0/)

      -->
      <img id="sky" src="assets/sky2.jpg">
      <a-asset-item id="room" src="assets/vr_gallery.glb"></a-asset-item>

      <a-asset-item id="map1" src="assets/MapForestChampi.glb"></a-asset-item>
      <a-asset-item id="map2" src="assets/MapAvecAnimaux.glb"></a-asset-item>
      <a-asset-item id="map3" src="assets/ilo.glb"></a-asset-item>
      <a-asset-item id="cloud1" src="assets/cloud1.glb"></a-asset-item>
      <a-asset-item id="cloud2" src="assets/cloud2.glb"></a-asset-item>
      <a-asset-item id="cloud3" src="assets/cloud3.glb"></a-asset-item>

      <a-asset-item
        id="mushroom"
        src="assets/glowing_mushroom.glb"
      ></a-asset-item>
      <!--  <audio id="eat-sound" src="assets/mushroomSon.mp3"></audio> -->
      <a-assets-item     v-if="eatSoundLoaded"    id="eat-sound"        src="#eat-sound"      ></a-assets-item>

     <!--  <audio src="https://cdn.aframe.io/basic-guide/audio/backgroundnoise.wav" autoplay
      preload></audio> -->
  
    </a-assets>
   
    <a-sky src="#sky" v-if="allAssetsLoaded"></a-sky>
 

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
      position="0 0 -11155"
      scale="1 1.1 1"
      animation-mixer
      ref="mapEntity2"
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



<!--     Clouds:
 --> 
 <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#cloud1"
      rotation="0 0 0"
      position="0 0 -35"
      scale="10 10 10"
    >
 </a-entity>
 

 <a-entity geometry="primitive: box" material="envMap: #sky; roughness: 10"></a-entity>  

 <!-- animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
 -->
    <TheNavMesh />

    <TheCameraRig> </TheCameraRig>
  </a-scene>
</template>

