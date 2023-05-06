import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

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
 * Shadows
 * Core Shadows --> Shadows on material itself due to lights
 * Drop Shadows --> Shadows on one material due to another material in presence of lights
 * firstly tell the renderer to enable shadowMap for taking shadow map pictures
 * then go to each geometry and think whether it can cast or(inclusive) receive shadow
 * then adjust the lights for making shadows 
 * Only directional, Point, Spot lights can create shadows
 * Maintain the render size for shadow map in lights
*/



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(2, 2, - 1)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)

directionalLight.castShadow = true;
// Use the value of power of 2
directionalLight.shadow.mapSize.width = 1024;       // Maintain the value properly as it affects the gpu
directionalLight.shadow.mapSize.height = 1024;       // Maintain the value properly as it affects the gpu

directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 10;

// Reduce the size of render
// Makes the render precis
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.bottom = -2;

// To blur the shadow 
directionalLight.shadow.radius = 10;

// To maintain the distance between light's camera(directionalLight.shadow.camera) and shadow map(directionalLight.shadow) we use near and far
// directionalLight.shadow.camera is a Orthographic Camera
const directionalCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);  // for better view
scene.add(directionalCameraHelper);

directionalCameraHelper.visible = false


/**
 * Spot Light
 */

const spotLight = new THREE.SpotLight(0xffffff, 0.5, 10, Math.PI * 0.3);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.position.set(0, 2, 2)

spotLight.shadow.camera.near = 2;
spotLight.shadow.camera.far = 10;
spotLight.shadow.camera.fov = 30;

spotLight.shadow.radius = 10;


scene.add(spotLight)
scene.add(spotLight.target)


const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightCameraHelper);

// spotLightCameraHelper.visible = false;





/**
 * Materials
*/
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
);
sphere.castShadow = true;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5
plane.receiveShadow = true
scene.add(sphere, plane)

/**
 * Sizes
*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true;

// Different Algos. to generate Shadow Maps
// InCase of PCFSoftShadowMap shadow.radius doesn't works
// No need Actually
// renderer.shadowMap.type = THREE.PCFSoftShadowMap  

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()