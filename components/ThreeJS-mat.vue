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

  // Make a new circle and set materials.
  const matrixGeo = new THREE.CircleGeometry(30, 20)
  // create a texture loader.
  const textureLoader = new THREE.TextureLoader()

  // load alphas
  const alphaTex = textureLoader.load('/imgs/textures/stripe.png')
  alphaTex.wrapS = THREE.RepeatWrapping
  alphaTex.wrapT = THREE.RepeatWrapping
  alphaTex.repeat.set(5, 5)

  // load Grass texture
  const grassTex = textureLoader.load('/imgs/textures/grassTex.png')
  const grassMat = new THREE.MeshStandardMaterial({
    map: grassTex,
    alphaMap: alphaTex,
    side: THREE.DoubleSide,
  })
  grassMat.transparent = true // needs to be set for alpha to work.
  const grassObj = new THREE.Mesh(matrixGeo, grassMat)
  console.log('grass is', grassObj)
  scene.add(grassObj)

  // load Gravel texture
  const gravelTex = textureLoader.load('/imgs/textures/gravelTex.png')
  const gravelMat = new THREE.MeshStandardMaterial({
    map: gravelTex,
    alphaMap: alphaTex,
    side: THREE.DoubleSide,
  })
  gravelMat.transparent = true // needs to be set for alpha to work.
  const gravelGeo = new THREE.CircleGeometry(30, 20)
  const gravelObj = new THREE.Mesh(gravelGeo, gravelMat)
  gravelObj.position.x += 50
  gravelObj.position.z += 0.01
  gravelObj.rotation.z = Math.PI / 3
  scene.add(gravelObj)

  // load Ground texture
  const groundTex = textureLoader.load('/imgs/textures/groundTex.png')
  const groundMat = new THREE.MeshStandardMaterial({
    map: groundTex,
    alphaMap: alphaTex,
    side: THREE.DoubleSide,
  })
  groundMat.transparent = true // needs to be set for alpha to work.
  const groundObj = new THREE.Mesh(matrixGeo, groundMat)
  groundObj.position.x += 100
  groundObj.position.z += 0.02
  groundObj.rotation.z = Math.PI / 6
  scene.add(groundObj)

  // load paving texture
  const pavingTex = textureLoader.load('/imgs/textures/pavingTex.png')
  const pavingMat = new THREE.MeshStandardMaterial({
    map: pavingTex,
    alphaMap: alphaTex,
    side: THREE.DoubleSide,
  })
  pavingMat.transparent = true // needs to be set for alpha to work.
  const pavingObj = new THREE.Mesh(matrixGeo, pavingMat)
  pavingObj.position.y += 50
  pavingObj.position.z += 0.02
  pavingObj.rotation.z = Math.PI / 2
  scene.add(pavingObj)

  rhinoLoader.load('models/bench.3dm', function (object) {
    scene.add(object)
    // initGUI(object.userData.layers)
    // hide spinner
    console.log('test', object)

    object.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        // ...and we replace the material with our custom one
        child.material = groundMat
      }
    })

    test.style.display = 'none'
  })

  rhinoLoader.load('models/testModel.3dm', function (object) {
    scene.add(object)
    // initGUI(object.userData.layers)
    // hide spinner
    console.log('test2', object)

    object.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        // ...and we replace the material with our custom one
        console.log(child.layer)
        // child.material = grassMat
      }
    })

    test.style.display = 'none'
  })

  // Add a tree.
  const treeGeo = new THREE.PlaneGeometry(20, 32)
  const treeTex = textureLoader.load('/imgs/textures/treeTex-01.png')
  const treeAlpha = textureLoader.load('/imgs/textures/treeAlpha-01.png')
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
