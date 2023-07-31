<script setup>
import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Rhino3dmLoader } from 'three/addons/loaders/3DMLoader.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { Sky } from 'three/addons/objects/Sky.js'

const test = ref(null)

let camera, scene, renderer
let controls, gui
let sky, sun
let bench, tree, lamp

let geometryGrass, materialGrass, grassGeo

onMounted(() => {
  init()
  animate()
})

function initSky() {
  // Add Sky
  sky = new Sky()
  sky.scale.setScalar(450000)
  sky.material.uniforms.up.value.set(0, 0, 1)
  scene.add(sky)

  sun = new THREE.Vector3()

  /// GUI

  const effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 5,
    azimuth: 0,
    exposure: renderer.toneMappingExposure,
  }

  function guiChanged() {
    const uniforms = sky.material.uniforms
    uniforms['turbidity'].value = effectController.turbidity
    uniforms['rayleigh'].value = effectController.rayleigh
    uniforms['mieCoefficient'].value = effectController.mieCoefficient
    uniforms['mieDirectionalG'].value = effectController.mieDirectionalG

    const phi = THREE.MathUtils.degToRad(90 - effectController.elevation)
    const theta = THREE.MathUtils.degToRad(effectController.azimuth)

    sun.setFromSphericalCoords(1, phi, theta)

    uniforms['sunPosition'].value.copy(sun)

    renderer.toneMappingExposure = effectController.exposure
    renderer.render(scene, camera)
  }

  guiChanged()
}

function init() {
  THREE.Object3D.DEFAULT_UP.set(0, 0, 1)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth - 2, window.innerHeight - 2)
  renderer.useLegacyLights = false
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.5
  test.value.appendChild(renderer.domElement)

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.set(150, 150, 200)

  scene = new THREE.Scene()

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
  scene.add(hemiLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(0, 0, 2)
  directionalLight.castShadow = true
  scene.add(directionalLight)

  const rhinoLoader = new Rhino3dmLoader()
  rhinoLoader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/')
  // rhinoLoader.load('models/Rhino_Logo.3dm', function (object) {
  //   scene.add(object)
  //   initGUI(object.userData.layers)

  //   // hide spinner
  //   test.style.display = 'none'
  // })

  rhinoLoader.load('models/testModel.3dm', function (object) {
    // scene.add(object)
    // initGUI(object.userData.layers)
    // hide spinner
    test.style.display = 'none'
  })

  // Load models, then rotate (0,0,pi/2) to get Z up.
  const jsonLoader = new THREE.ObjectLoader()
  jsonLoader.load('json/benchModel.json', function (geometry) {
    bench = geometry
    bench.rotation.set(0, 0, Math.PI / 2)
    scene.add(bench)
  })

  // Make a new circle and set materials.
  const geometryGrass = new THREE.CircleGeometry(50, 20)
  // create a texture loader.
  const textureLoader = new THREE.TextureLoader()

  // load alphas
  const alphaTexture = textureLoader.load('/imgs/textures/stripe.png')
  alphaTexture.wrapS = THREE.RepeatWrapping
  alphaTexture.wrapT = THREE.RepeatWrapping
  alphaTexture.repeat.set(3, 2)

  // load a texture
  const grassTexture = textureLoader.load('/imgs/textures/texGrass.jpg')
  const materialGrass = new THREE.MeshStandardMaterial({
    map: grassTexture,
    alphaMap: alphaTexture,
    side: THREE.DoubleSide,
  })
  materialGrass.transparent = true // needs to be set for alpha to work.
  const grassGeo = new THREE.Mesh(geometryGrass, materialGrass)
  scene.add(grassGeo)

  // add another texture
  const aspTexture = textureLoader.load('/imgs/textures/texAsphalt.jpg')
  const materialAsp = new THREE.MeshStandardMaterial({
    map: aspTexture,
    alphaMap: alphaTexture,
    side: THREE.DoubleSide,
  })
  materialAsp.transparent = true
  const aspGeo = new THREE.Mesh(geometryGrass, materialAsp)
  aspGeo.rotation.z = Math.PI / 4
  aspGeo.rotation.x = Math.PI
  aspGeo.position.x += 50
  aspGeo.position.z += 0.1
  scene.add(aspGeo)

  // try to add a tree.
  const treeGeo = new THREE.PlaneGeometry(70 / 2, 85 / 2)
  const treeTex = textureLoader.load('/imgs/textures/tree3.png')
  const treeAlpha = textureLoader.load('/imgs/textures/tree3_alpha.png')
  const treeMaterial = new THREE.MeshStandardMaterial({
    map: treeTex,
    alphaMap: treeAlpha,
    side: THREE.DoubleSide,
  })
  treeMaterial.transparent = true
  const treePlane = new THREE.Mesh(treeGeo, treeMaterial)
  treePlane.rotation.x = Math.PI / 2
  treePlane.position.z += 20
  scene.add(treePlane)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.update()
  initSky()
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
        // val is True or False
        const name = this.object.name

        scene.traverse(function (child) {
          if (child.userData.hasOwnProperty('attributes')) {
            if ('layerIndex' in child.userData.attributes) {
              const layerName =
                layers[child.userData.attributes.layerIndex].name

              // TODO: Add a dictionary of layer:material. Make sure all layer names in Rhino are set well.
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
