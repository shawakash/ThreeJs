import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Use Ambient Light for bouncing Lights
const ambientLight = new THREE.AmbientLight()         // omni direstional light --> rays come from <everywhere
ambientLight.color = new THREE.Color('white');
ambientLight.intensity = 0.5;

gui.add(ambientLight, 'intensity').min(0).max(1).step(0.00001).name('Light Intensity');

scene.add(ambientLight)

// Directional lights are used to send parrell lights i.e. it is not spreading light in all direction like sun
const directionalLights = new THREE.DirectionalLight(0x00ffcc, 0.5);
// Direction of sun can be set, but it is always normal to origin
// Imagine a sphere then the directionallights lights normally
directionalLights.position.set(1, 0, 0)
scene.add(directionalLights);


// Hemispherical Light --> Parallel Lights comming from -z axis and z-axis i.e. ground lights and sky Lights
// At surface center of material the skycolor and ground color gets mixed
const hemisphericalLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9);
scene.add(hemisphericalLight)

// Point Light --> Infinetly small Light spreading in all directions, Lights in every Direction
// Its like a candle
// Distance is the amount upto which it should spread Light
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1);

scene.add(pointLight);


// RECTANGULAR lIGHT
// It works only with MeshStandardMaterial and MeshPhyscialMaterial
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 1, 2, 2);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3())    // To turn the rectangular Light at (-1.5, 0, 1.5) to origin 
scene.add(rectAreaLight);

// Spot Light -- Like a FlashLight
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);
// Color, Intensity, Distance, Solid Angle, penumbra-- scattering around edges, decay
spotLight.position.set(0, 2, 3);
// spotLight.target is a Object3D, so to fix it's position we need to add it ti scene;
spotLight.target.position.x = 1.5;
scene.add(spotLight.target);
scene.add(spotLight)


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()            // Requires Light
// material.wireframe = true;
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()