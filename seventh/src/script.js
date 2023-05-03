import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// LatheGeometry --> this is used to generate a surface from a curve by revolution

// const geometry = new THREE.CapsuleGeometry(1, 2, 1000, 1000);
// const geometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100)
// const geometry = new THREE.SphereGeometry(1, 1000, 1000);
// const geometry = new THREE.ConeGeometry(1, 2, 1000, 1000, false);
// const geometry = new THREE.DodecahedronGeometry(1)
// const geometry = new THREE.TorusKnotGeometry(1, 0.2, 1000, 1000, 2, 15)   // read docs
// const geometry = new THREE.TorusGeometry(1, 0.6, 1000, 1000)
// const geometry = new THREE.RingGeometry(.5, 1, 1000, 1000, 0)
// const geometry = new THREE.CylinderGeometry(1, 2, 2, 1000, 1000)
// const geometry = new THREE.CircleGeometry(2, 10000, 0, 2)


const positionsArray = new Float32Array([
    0,0,0,
    0,1,0,
    1,0,0
]);

const positionAttributes = new THREE.BufferAttribute(positionsArray, 3, true)

const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionAttributes);    // More On Shaders

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
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