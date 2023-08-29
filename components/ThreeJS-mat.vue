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
  sky.scale.setScalar(50000)
  sky.material.uniforms.up.value.set(0, 0, 1)
  scene.add(sky)

  sun = new THREE.Vector3()

  /// GUI

  const effectController = {
    turbidity: 1,
    rayleigh: 5,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 65,
    azimuth: 90,
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
  renderer.toneMappingExposure = 0.85
  test.value.appendChild(renderer.domElement)

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.set(150, 150, 200)

  scene = new THREE.Scene()

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 2)
  scene.add(hemiLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  directionalLight.position.set(2, 2, 5)
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
    alphaTest: 0.5,
    transparent: false,
  })
  const grassObj = new THREE.Mesh(matrixGeo, grassMat)
  // scene.add(grassObj)

  // load Gravel texture
  const gravelTex = textureLoader.load('/imgs/textures/gravelTex.png')
  const gravelMat = new THREE.MeshStandardMaterial({
    map: gravelTex,
    alphaMap: alphaTex,
    side: THREE.DoubleSide,
    alphaTest: 0.5,
    transparent: false,
  })
  const gravelGeo = new THREE.CircleGeometry(30, 20)
  const gravelObj = new THREE.Mesh(gravelGeo, gravelMat)
  gravelObj.position.x += 50
  gravelObj.position.z += 0.01
  gravelObj.rotation.z = Math.PI / 3

  // load Ground texture
  const groundTex = textureLoader.load('/imgs/textures/groundTex.png')
  const groundMat = new THREE.MeshStandardMaterial({
    map: groundTex,
    alphaMap: alphaTex,
    side: THREE.DoubleSide,
    alphaTest: 0.5,
    transparent: false,
  })
  const groundObj = new THREE.Mesh(matrixGeo, groundMat)
  groundObj.position.x += 100
  groundObj.position.z += 0.02
  groundObj.rotation.z = Math.PI / 6
  // scene.add(groundObj)

  // load paving texture
  const pavingTex = textureLoader.load('/imgs/textures/pavingTex.png')
  const pavingMat = new THREE.MeshStandardMaterial({
    map: pavingTex,
    alphaMap: alphaTex,
    side: THREE.DoubleSide,
    alphaTest: 0.5,
    transparent: false,
  })
  const pavingObj = new THREE.Mesh(matrixGeo, pavingMat)
  pavingObj.position.y += 50
  pavingObj.position.z += 0.02
  pavingObj.rotation.z = Math.PI / 2
  // scene.add(pavingObj)

  const woodTex = textureLoader.load('/imgs/textures/woodTex.png')
  const woodMat = new THREE.MeshStandardMaterial({
    map: woodTex,
    side: THREE.DoubleSide,
  })

  const bldgMat = new THREE.MeshStandardMaterial({
    color: 0x04d9ff,
    side: THREE.DoubleSide,
  })
  const meshMat = new THREE.MeshStandardMaterial({
    color: 0xccff00,
    side: THREE.DoubleSide,
  })

  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    side: THREE.DoubleSide,
  })

  const metalTex = textureLoader.load('/imgs/textures/metalTex.png')
  const metalMat = new THREE.MeshStandardMaterial({
    map: metalTex,
    side: THREE.DoubleSide,
  })
  // metalMat.transparent = true // needs to be set for alpha to work.

  rhinoLoader.load('models/testModel.3dm', function (object) {
    scene.add(object)

    scene.traverse(function (child) {
      if (child.userData.hasOwnProperty('attributes')) {
        if ('layerIndex' in child.userData.attributes) {
          // check the layerIndex and crosscheck with the name in object.userData.layers
          // console.log('This child is', child)
          // console.log('layerIndex is ', child.userData.attributes.layerIndex)
          const layerName =
            object.userData.layers[child.userData.attributes.layerIndex].name

          if (layerName == 'GRASS') {
            // apply grass
            child.material = grassMat

            const edge = new THREE.EdgesGeometry(child.geometry)
            const line = new THREE.LineSegments(
              edge,
              new THREE.LineBasicMaterial({
                color: 'rgb(139,134,78)',
                linewidth: 20,
              })
            )
            scene.add(line)
          }

          if (layerName == 'TREE') {
            child.material = treeMaterial
          } else if (layerName == 'METAL') {
            child.material = metalMat
          } else if (layerName == 'WETLAND') {
            child.material = gravelMat
            const edge = new THREE.EdgesGeometry(child.geometry)
            const line = new THREE.LineSegments(
              edge,
              new THREE.LineBasicMaterial({
                color: 'rgb(139,134,78)',
                linewidth: 20,
              })
            )
            scene.add(line)
          } else if ((layerName == 'MESH') | (layerName == 'MAIN')) {
            child.material = meshMat
          } else if (layerName == 'BUILDINGS') {
            child.material = bldgMat
          } else if (layerName == 'CORE') {
            child.material = coreMat
          } else if (layerName == 'WOOD') {
            child.material = woodMat
          } else if (layerName == 'PATH') {
            child.material = pavingMat
            const edge = new THREE.EdgesGeometry(child.geometry)
            const line = new THREE.LineSegments(
              edge,
              new THREE.LineBasicMaterial({
                color: 'rgb(139,134,78)',
                linewidth: 20,
              })
            )
            scene.add(line)
          } else if (layerName == 'GARDEN') {
            // apply grass
            child.material = groundMat
            const edge = new THREE.EdgesGeometry(child.geometry)
            const line = new THREE.LineSegments(
              edge,
              new THREE.LineBasicMaterial({
                color: 'rgb(139,134,78)',
                linewidth: 20,
              })
            )
            scene.add(line)
          }

          initGUI(object.userData.layers)
        }
      }
    })

    // object.traverse(function (child) {
    //   if (child instanceof THREE.Mesh) {
    //     // ...and we replace the material with our custom one
    //     console.log('child is', child)
    //     // child.material = grassMat
    //   }
    // })

    test.style.display = 'none'
  })

  // Add infinte floor plane
  var planeMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  })
  var planeGeo = new THREE.CircleGeometry(1000, 10)

  var infPlane = new THREE.Mesh(planeGeo, planeMat)
  infPlane.position.z = -50
  infPlane.receiveShadow = false
  scene.add(infPlane)

  // Add a tree.
  const treeTex = textureLoader.load('/imgs/textures/treeTex-01.png')
  const treeAlpha = textureLoader.load('/imgs/textures/treeAlpha-01.png')
  const treeMaterial = new THREE.MeshStandardMaterial({
    map: treeTex,
    alphaMap: treeAlpha,
    side: THREE.DoubleSide,
    transparent: false,
    alphaTest: 0.5,
  })

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
