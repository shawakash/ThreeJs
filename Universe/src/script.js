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
parameters.count = 100000;
parameters.size = 0.0002;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1
parameters.randomness = 0.343;
parameters.randomnessPow = 4;
parameters.insideColor = '#3fd7fd';
parameters.outsideColor = '#1a3047';
parameters.count2 = 100000;
parameters.size2 = 0.0002;
parameters.radius2 = 5;
parameters.branches2 = 3;
parameters.spin2 = 1
parameters.randomness2 = 0.343;
parameters.randomnessPow2 = 4;
parameters.insideColor2 = '#17181c';
parameters.outsideColor2 = '#1b2127';
parameters.universeCount = 100000;
parameters.universeSize = 0.002;

let particlesGeometry = null;
let particlesMaterial = null;
let particles = null;




const generateGalaxy = () => {
    // Destroy old galaxy
    if (particles !== null) {
        particlesGeometry.dispose()
        particlesMaterial.dispose()
        scene.remove(particles)
    }

    /**
     * particlesGeometry
     */
    particlesGeometry = new THREE.BufferGeometry()


    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.count; i++) {
        // Position
        const i3 = i * 3

        const radius = Math.random() * parameters.radius

        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPow) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomY = Math.pow(Math.random(), parameters.randomnessPow) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomZ = Math.pow(Math.random(), parameters.randomnessPow) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ


        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3 + 0] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    /**
     * Material
    */
    particlesMaterial = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })


    /**
     * Points
    */
    particles = new THREE.Points(particlesGeometry, particlesMaterial)
    particles.position.set(-5 * (Math.random() + 1), -5 * (Math.random() + 1), 0 * (Math.random() + 1))
    particles.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2)
    scene.add(particles)

}


/**
 * Galaxy 2
 */

let particles2Geometry = null;
let particles2Material = null;
let particles2 = null;



const generateGalaxy2 = () => {
    // Destroy old galaxy
    if (particles2 !== null) {
        particles2Geometry.dispose()
        particles2Material.dispose()
        scene.remove(particles2)
    }

    /**
     * particlesGeometry
     */
    particles2Geometry = new THREE.BufferGeometry()


    const positions2 = new Float32Array(parameters.count2 * 3)
    const colors2 = new Float32Array(parameters.count2 * 3)

    const colorInside = new THREE.Color(parameters.insideColor2)
    const colorOutside = new THREE.Color(parameters.outsideColor2)

    for (let i = 0; i < parameters.count2; i++) {
        // Position
        const i3 = i * 3

        const radius = Math.random() * parameters.radius2

        const spinAngle = radius * parameters.spin2
        const branchAngle = (i % parameters.branches2) / parameters.branches2 * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPow2) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness2 * radius
        const randomY = Math.pow(Math.random(), parameters.randomnessPow2) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness2 * radius
        const randomZ = Math.pow(Math.random(), parameters.randomnessPow2) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness2 * radius

        positions2[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions2[i3 + 1] = randomY
        positions2[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ


        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius2)

        colors2[i3 + 0] = mixedColor.r
        colors2[i3 + 1] = mixedColor.g
        colors2[i3 + 2] = mixedColor.b
    }

    particles2Geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions2, 3))
    particles2Geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors2, 3))

    /**
     * Material
    */
    particles2Material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })


    /**
     * Points
    */
    particles2 = new THREE.Points(particles2Geometry, particles2Material)
    particles2.position.set(5 * (Math.random() + 1), 5 * (Math.random() + 1), 0 * (Math.random() + 1))
    particles2.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2)
    scene.add(particles2)

}

/**
 * Universe
*/

let universeGeometry = null;
let universeMaterial = null;
let universe = null;

const generateUniverse = () => {

    if(universe != null) {
        universeGeometry = null;
        universeMaterial = null;
        scene.remove(universe);
    }

    universeGeometry = new THREE.BufferGeometry()
    const universePositions = new Float32Array(parameters.count * 3)
    for (let i = 0; i < parameters.universeCount; i++) {

        universePositions[i + 0] = (Math.random() - 0.5) * 500;
        universePositions[i + 1] = (Math.random() - 0.5) * 500;
        universePositions[i + 2] = (Math.random() - 0.5) * 500;
    }

    universeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(universePositions, 3))
    universeMaterial = new THREE.PointsMaterial({
        size: parameters.universeSize,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    })
    universe = new THREE.Points(universeGeometry, universeMaterial);
    scene.add(universe)
}

const galaxy1 = gui.addFolder('Milky Way');
const galaxy2 = gui.addFolder('Anodromeda');
const universeTweek = gui.addFolder('Universe');


galaxy1
    .add(parameters, 'count')
    .min(200)
    .max(4000000)
    .step(100)
    .name('Particles Count')
    .onFinishChange(generateGalaxy);
galaxy1
    .add(parameters, 'size')
    .min(0.00002)
    .max(4)
    .step(0.0001)
    .name('Particles Size')
    .onFinishChange(generateGalaxy);

galaxy1
    .add(parameters, 'radius')
    .min(0.01)
    .max(20)
    .step(0.001)
    .name('Galaxy Radius')
    .onFinishChange(generateGalaxy);

galaxy1
    .add(parameters, 'spin')
    .min(0.01)
    .max(20)
    .step(0.001)
    .name('Galaxy Spin')
    .onFinishChange(generateGalaxy);
galaxy1
    .add(parameters, 'branches')
    .min(2)
    .max(20)
    .step(1)
    .name('Galaxy Branches')
    .onFinishChange(generateGalaxy);
galaxy1
    .add(parameters, 'randomness')
    .min(0)
    .max(1)
    .step(0.001)
    .name('Galaxy  Random')
    .onFinishChange(generateGalaxy);
galaxy1
    .add(parameters, 'randomnessPow')
    .min(0)
    .max(10)
    .step(0.001)
    .name('Galaxy  Random Power')
    .onFinishChange(generateGalaxy);
galaxy1
    .addColor(parameters, 'insideColor')
    .name('Galaxy Inside Color')
    .onFinishChange(generateGalaxy);
galaxy1
    .addColor(parameters, 'outsideColor')
    .name('Galaxy Outside Color')
    .onFinishChange(generateGalaxy);



galaxy2
    .add(parameters, 'count2')
    .min(200)
    .max(4000000)
    .step(100)
    .name('Particles Count2')
    .onFinishChange(generateGalaxy2);
galaxy2
    .add(parameters, 'size2')
    .min(0.00002)
    .max(4)
    .step(0.0001)
    .name('Particles Size2')
    .onFinishChange(generateGalaxy2);

galaxy2
    .add(parameters, 'radius2')
    .min(0.01)
    .max(20)
    .step(0.001)
    .name('Galaxy Radius2')
    .onFinishChange(generateGalaxy2);

galaxy2
    .add(parameters, 'spin2')
    .min(0.01)
    .max(20)
    .step(0.001)
    .name('Galaxy Spin2')
    .onFinishChange(generateGalaxy2);
galaxy2
    .add(parameters, 'branches2')
    .min(2)
    .max(20)
    .step(1)
    .name('Galaxy Branches2')
    .onFinishChange(generateGalaxy2);
galaxy2
    .add(parameters, 'randomness2')
    .min(0)
    .max(1)
    .step(0.001)
    .name('Galaxy  Random2')
    .onFinishChange(generateGalaxy2);
galaxy2
    .add(parameters, 'randomnessPow2')
    .min(0)
    .max(10)
    .step(0.001)
    .name('Galaxy  Random Power2')
    .onFinishChange(generateGalaxy2);
galaxy2
    .addColor(parameters, 'insideColor2')
    .name('Galaxy Inside Color2')
    .onFinishChange(generateGalaxy2);
galaxy2
    .addColor(parameters, 'outsideColor2')
    .name('Galaxy Outside Color2')
    .onFinishChange(generateGalaxy2);


universeTweek
    .add(parameters, 'universeCount')
    .min(100000)
    .max(1000000)
    .step(1)
    .name('Universe Count')
    .onFinishChange(generateUniverse);
universeTweek
    .add(parameters, 'universeSize')
    .min(0.0001)
    .max(3)
    .step(0.0001)
    .name('Universe Size')
    .onFinishChange(generateUniverse);


generateGalaxy2()
generateUniverse();
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
// camera.position.y = 3
camera.position.z = 25
scene.add(camera);

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