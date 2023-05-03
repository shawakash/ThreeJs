import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap';
import * as lil from 'lil-gui';
import * as dat from 'dat.gui';


// const gui = new lil.GUI();
const gui = new dat.GUI({ closed: true });

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
const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material);

// To Use GUI only on Objects
// gui.add(Object, 'name', min, max, precesion)
// gui.add(mesh.position, "y", -3, 20, 0.00000001)
gui.add(mesh.position, "x", -3, 20, .001)
gui.add(mesh.position, "y", -3, 20, .001)
gui.add(mesh.position, "z", -3, 20, .001)
gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(10)
    .step(0.0001)
    .name("Box's Y :)");

gui
    .add(mesh, 'visible');

gui
    .add(material, 'wireframe');


// By logic
const colors = gui.addFolder('Colors (RGB)');
colors
    .add(material.color, 'r')
    .min(0.1)
    .max(1)
    .step(0.0001)
    .name('R');
colors
    .add(material.color, 'g')
    .min(0.1)
    .max(1)
    .step(0.0001)
    .name('G');
colors
    .add(material.color, 'b')
    .min(0.1)
    .max(1)
    .step(0.0001)
    .name('B');

// By .addColor
const parameters = {
    color: 0xff0000,
    spin: () => {
        gsap.to(mesh.rotation, {y: 2 * Math.PI + mesh.rotation.y, duration: 1})
    }
}
gui
    .addColor(parameters, 'color')
    .onChange((color) => {
        material.color.set(color)
    })
    .name('Colors');

gui.add(parameters, 'spin').name('Test Me')

scene.add(mesh)

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
camera.position.z = 3
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