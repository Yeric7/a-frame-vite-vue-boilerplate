<script setup>
  import { ref } from 'vue';

  import TheCameraRig from './TheCameraRig.vue';
  import TheNavMesh from './TheNavMesh.vue';
  import TheMainRoom from './TheMainRoom.vue';
  import TheLifeCubeRoom from './TheLifeCubeRoom.vue';

  
  import '../aframe/animation-mixer';
  import '../aframe/life-like-automaton.js';
  import '../aframe/teleport-camera-rig.js';
  import  '../aframe/grabbable.js';

  defineProps({
    scale: Number,
    overlaySelector: String,
  });

  const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene
    background="color: black;"
    renderer="colorManagement: true;"
 
  >

    <a-assets @loaded="allAssetsLoaded = true">
      <!--
        Title: Champion Trip
        Model source: https://sketchfab.com/3d-models/vr-gallery-1ac32ed62fdf424498acc146fad31f7e
        Model author: https://sketchfab.com/mvrc.art (Maxim Mavrichev)
        Model license: CC BY 4.0 ( https://creativecommons.org/licenses/by/4.0/ )
      -->
      <a-asset-item  id="room" src="assets/vr_gallery.glb"></a-asset-item>

      <a-asset-item  id="map1" src="assets/MapForestChampi.glb"></a-asset-item>
      <a-asset-item  id="map2" src="assets/MapAvecAnimaux.glb" ></a-asset-item>
      <a-asset-item  id="map3" src="assets/ilo.glb" ></a-asset-item>
      <a-asset-item  id="mushroom" src="assets/glowing_mushroom.glb" ></a-asset-item>
  
    </a-assets>

    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#map1"
      rotation="0 90 0"
      position="0 -15 -5"
      scale="1 1.1 1"
    >    </a-entity>

    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#map2"
      rotation="0 90 0"
      position="50 0 -55"
      scale="1 1.1 1"
      animation-mixer
    ></a-entity>

    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#map3"
      rotation="0 90 0"
      position="0 0 -5"
      scale="1 1.1 1"
    >    </a-entity>

    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#mushroom"
      position="-6.633 0.5 -13.754"
      scale="0.5 0.5 0.5"
      animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
      grabbable="target:#hand-right"
      clickable
    ></a-entity>
<!-- animation="property: rotation; to: 0 360 0; loop: true; dur: 3000"
 --> 
    <TheNavMesh />

    <TheCameraRig />

  </a-scene>
</template>