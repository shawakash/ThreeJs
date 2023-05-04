import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Texture
 */

// const image = new Image();
// // image.onload = () => {

// //     const texture = new THREE.Texture(image);
// //     console.log(texture)

// // }

// const texture = new THREE.Texture(image);

// image.addEventListener('load', () => {          // As we need to use textue outside the function

//     texture.needsUpdate = true;
    
// })

// image.src = '/textures/door/color.jpg';
// console.log(image)

// Using Texture Loader
// const textureLoader = new THREE.TextureLoader();
// //One texture loader can load multiple texture
// const texture = textureLoader.load(
//     '/textures/door/color.jpg',
//     () => {
//         console.log('Loaded');
//     },
//     () => {
//         console.log('progress');     // Usually never Works
//     },
//     (e) => {
//         console.log(e.message)
//     }
// );

// Writing The functions inside Load can be cumbersome

const loadingManager = new THREE.LoadingManager();
// Be carefull to load all the loader before the textLoader
loadingManager.onStart = () => {
    console.log('Manger Is Starting');
}
loadingManager.onLoad = () => {
    console.log('Manger Is Loaded');
}
loadingManager.onProgress = () => {
    console.log('Manger Is Progressing');
}
loadingManager.onError = (e) => {
    console.log(e);
}
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/textures/door/color.jpg');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const ambientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map:ambientTexture });
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()