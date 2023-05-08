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
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('textures/particles/9.png');

/**
 * Particles
 */

// Geometry
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);

// Particle Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,              // for particle pixel
    sizeAttenuation: true,   // for particles to be perspective
    transparent: true,
    alphaMap: particleTexture,
    color: 'pink'
});

// particlesMaterial.alphaTest = 0.001;
// When drawing WebGl Tests if what's being drawn is closer than what's already drawn
// This deactivates the alphaTest

// particlesMaterial.depthTest = false;

// Depth testing is not a good solution as when geometries of other colors are added it makes it look like transparent making the particle behind it visible

// The depth of what being drawn is stored in depth buffer.
// Instead of not testing if the particle is close than what is in depth buffer we can tell WebGl not to write particle in that depth buffer with depth test

particlesMaterial.depthWrite = false;


// Particle Mesh --> .Point
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles)


/**
 * Multiple Render of a Particles confuses the Webgl which one was created first,
 * as a result of which some particle allows transparency whereas some doesn't
 * Gpu is fine here
 * 
 * *** To fix this we use Alpha Test
 */



/**
 *  Random Points -->>>> Custom
*/

// Particle Material
const particleMaterial = new THREE.PointsMaterial({
    size: 0.05,
    sizeAttenuation: true,
    transparent: true,
    alphaMap: particleTexture,
    color: 'cyan'
});

particleMaterial.alphaTest = 0.001;


for (let i = 0; i < 30000; i++) {

    // Particle Geometry
    const particleGeometry = new THREE.BufferGeometry();

    const positionX = (Math.random() - 0.5) * 300;
    const positionY = (Math.random() - 0.5) * 300;
    const positionZ = (Math.random() - 0.5) * 300;

    const position = new THREE.Float32BufferAttribute([
        positionX, positionY, positionZ
    ], 3);

    particleGeometry.setAttribute('position', position);
    const particle = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particle)
}

//  || Alternative to up

/**
 * const particleGeometry = new THREE.BufferGeometry();
 * const count = 5000;
 * const positions = new Float32Array(count * 3);
 * 
 * for(let i=0; i< count * 3; i++) {
 *      positions[i] = (Math.random() - 0.5) * 20;
 * }
 * 
 * particleGeometry.setAttribute(
 *      'position', 
 *      new THREE.Float32BufferAttribute(positions, 3)
 * );
 * 
 * const particleMaterial = new THREE.PointsMaterial({
 *      sizes: 0.02,
 *      sizeAttenuation: true
 * });
 * 
 * const particle = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particle);
 */





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