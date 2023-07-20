<script setup>
import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Rhino3dmLoader } from 'three/addons/loaders/3DMLoader.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

const test = ref(null)

let camera, scene, renderer
let controls, gui

onMounted(() => {
  init()
  animate()
})
// init()
// animate()

function init() {
  THREE.Object3D.DEFAULT_UP.set(0, 0, 1)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.useLegacyLights = false
  test.value.appendChild(renderer.domElement)

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.set(26, -40, 5)

  scene = new THREE.Scene()

  const directionalLight = new THREE.DirectionalLight(0xffffff, 6)
  directionalLight.position.set(0, 0, 2)
  scene.add(directionalLight)

  const rhinoLoader = new Rhino3dmLoader()
  rhinoLoader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/')
  // rhinoLoader.load('models/Rhino_Logo.3dm', function (object) {
  //   scene.add(object)
  //   initGUI(object.userData.layers)

  //   // hide spinner
  //   test.style.display = 'none'
  // })

  rhinoLoader.load('models/BaseFile.3dm', function (object) {
    scene.add(object)
    initGUI(object.userData.layers)

    // hide spinner
    test.style.display = 'none'
  })

  // const jsonLoader = new THREE.ObjectLoader()
  // jsonLoader.load('json/benchModel.json', function (geometry) {
  //   // mesh.position.x = 500
  //   // mesh.position.y = 100
  //   // mesh.position.z = 500
  //   scene.add(geometry)
  // })

  controls = new OrbitControls(camera, renderer.domElement)

  window.addEventListener('resize', resize)
}

function resize() {
  const width = window.innerWidth
  const height = window.innerHeight

  camera.aspect = width / height
  camera.updateProjectionMatrix()

  renderer.setSize(width, height)
}

function animate() {
  controls.update()
  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

function initGUI(layers) {
  gui = new GUI({ title: 'layers' })

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i]
    gui
      .add(layer, 'visible')
      .name(layer.name)
      .onChange(function (val) {
        const name = this.object.name

        scene.traverse(function (child) {
          if (child.userData.hasOwnProperty('attributes')) {
            if ('layerIndex' in child.userData.attributes) {
              const layerName =
                layers[child.userData.attributes.layerIndex].name

              if (layerName === name) {
                child.visible = val
                layer.visible = val
              }
            }
          }
        })
      })
  }
}
</script>

<template>
  <div id="loader" ref="test"></div>
</template>

<style>
#loader {
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
