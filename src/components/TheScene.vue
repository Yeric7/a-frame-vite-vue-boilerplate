<script setup>
  import { ref } from 'vue';
  import { randomHsl } from '../utils/color.js';

  import BoxColorChanging from './BoxColorChanging.vue';
  import TheCameraRig from './TheCameraRig.vue';
  import TheNavMesh from './TheNavMesh.vue';

  import '../aframe/life-like-automaton';
  import '../aframe/animation-mixer';

  defineProps({
    scale: Number,
    overlaySelector: String,
  });

  const colorBoxLeft = ref(randomHsl());
  const colorBoxRight = ref(randomHsl());
  const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene
    background="color: black;"
    renderer="colorManagement: true;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
      optionalFeatures: dom-overlay;
      overlayElement: ${overlaySelector};
    `"
  >

    <a-assets @loaded="allAssetsLoaded = true">
      <!--
        Title: VR Gallery
        Model source: https://sketchfab.com/3d-models/vr-gallery-1ac32ed62fdf424498acc146fad31f7e
        Model author: https://sketchfab.com/mvrc.art (Maxim Mavrichev)
        Model license: CC BY 4.0 ( https://creativecommons.org/licenses/by/4.0/ )
      -->
      <a-asset-item  id="map1" src="assets/MapForestChampi.glb"></a-asset-item>
      <a-asset-item  id="map2" src="assets/MapAvecAnimaux.glb" ></a-asset-item>
      <a-asset-item  id="map3" src="assets/ilo.glb" ></a-asset-item>
    </a-assets>

    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#map1"
      rotation="0 90 0"
      position="0 -15 -5"
      scale="1 1.1 1"
      animation-mixer
    >
    
    </a-entity>
  <!--   <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#map1"
      rotation="0 90 0"
      position="0 0 -5"
      scale="1 1.1 1"
      animation-mixer
    >
    </a-entity> -->

    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#map2"
      rotation="0 90 0"
      position="50 0 -55"
      scale="1 1.1 1"
      animation-mixer
    
    >
    </a-entity>

    <a-entity
      v-if="allAssetsLoaded"
      gltf-model="#map3"
      rotation="0 90 0"
      position="0 0 -5"
      scale="1 1.1 1"

    >
    
    </a-entity>

    <TheNavMesh />

    <TheCameraRig />

  </a-scene>
</template>