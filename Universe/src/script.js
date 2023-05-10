import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 400 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Generate Galaxy
 */
const parameters = {};
parameters.count = 40000;
parameters.size = 0.02;
parameters.radius = 5;
parameters.branches = 3;

let particlesGeometry = null;
let particlesMaterial = null;
let particles = null;


const generateGalaxy = () => {

    /***
     *  To destroy old galaxy before creating a new one for to optimize gpu
     */

    if (particles != null) {
        particlesGeometry = null;
        particlesMaterial = null;
        scene.remove(particles);
    }

    /**
     * Particles Geometry
     */
    particlesGeometry = new THREE.BufferGeometry();

    const positions = new Float32Array(parameters.count * 3);


    /**
     * Branches
     */
    let branchAngle = 0;

    for (let branch = 0; branch < parameters.branches; branch++) {
        branchAngle += Math.PI * (2 / 3);

        for (let i = 0; i < parameters.count; i += 3) {
            const radius = Math.random() * parameters.radius;
            positions[i + 0] = radius * Math.cos(radius) ;
            positions[i + 1] = radius * Math.sin(radius);
            positions[i + 2] = radius * 0.4;
        }

        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        /**
         * Particles Material
        */
        particlesMaterial = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: true,
            blending: THREE.AdditiveBlending
        });


        /**
         * Particles
        */
        particles = new THREE.Points(particlesGeometry, particlesMaterial);
        particles.rotation.z = branchAngle;
        
        scene.add(particles);
    }
}
gui
    .add(parameters, 'count')
    .min(200)
    .max(4000000)
    .step(100)
    .name('Particles Count')
    .onFinishChange(generateGalaxy);
gui
    .add(parameters, 'size')
    .min(0.02)
    .max(4)
    .step(0.0001)
    .name('Particles Size')
    .onFinishChange(generateGalaxy);

gui
    .add(parameters, 'radius')
    .min(0.01)
    .max(20)
    .step(0.001)
    .name('Galaxy Radius')
    .onFinishChange(generateGalaxy);
gui
    .add(parameters, 'branches')
    .min(2)
    .max(20)
    .step(1)
    .name('Galaxy Branches')
    .onFinishChange(generateGalaxy);


generateGalaxy();


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
camera.position.x = 3
camera.position.y = 3
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