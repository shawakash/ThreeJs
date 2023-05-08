import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Particles
 * Each Particles is composed of two triangles always facing the cameras
 * Star Smoke Rain Dust Fire can be created with particles
 * Making is similar to mesh 
 */


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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Particles
 */

// Geometry
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);

// Particle Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,              // for particle pixel
    sizeAttenuation: true   // for particles to be perspective
});

// Particle Mesh --> .Point
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles)


/**
 *  Random Points -->>>> Custom
*/ 

// Particle Material
const particleMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true
});


for (let i = 0; i < 1000; i++) {
    
    // Particle Geometry
    const particleGeometry = new THREE.BufferGeometry();

    const positionX = (Math.random() - 0.5) * 20;
    const positionY = (Math.random() - 0.5) * 20;
    const positionZ = (Math.random() - 0.5) * 20;
    const position = new THREE.Float32BufferAttribute([
        positionX, positionY, positionZ
    ], 3);

    particleGeometry.setAttribute('position', position);
    const particle = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particle)
}




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