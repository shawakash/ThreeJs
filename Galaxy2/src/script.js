import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import vertexShader from './shaders/galaxy/vertex.glsl';
import fragmentShader from './shaders/galaxy/fragment.glsl';

import uvertexShader from './shaders/universe/vertex.glsl';
import ufragmentShader from './shaders/universe/fragment.glsl';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
const debugObject = {};

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Galaxy
 */
const parameters = {}
parameters.count = 200000
parameters.size = 0.005
parameters.radius = 5
parameters.branches = 3
parameters.spin = 1
parameters.randomness = 0.5
parameters.randomnessPower = 3
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'

let geometry = null
let material = null
let points = null

const generateGalaxy = () => {
    if (points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const scales = new Float32Array(parameters.count * 1);
    const randomness = new Float32Array(parameters.count * 3);


    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.count; i++) {
        const i3 = i * 3

        // Position
        const radius = Math.random() * parameters.radius

        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
        
        // Randomness

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
        
        randomness[i3 + 0] = randomX;
        randomness[i3 + 1] = randomY;
        randomness[i3 + 2] = randomZ;
        
        positions[i3] = Math.cos(branchAngle) * radius + randomX;
        positions[i3 + 1] = 0 + randomY;
        positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ;
        

        
        // Color
        const mixedColor = insideColor.clone()
        mixedColor.lerp(outsideColor, radius / parameters.radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b

        // Scale
        scales[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))

    /**
     * Material
     */
    material = new THREE.ShaderMaterial({
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader,
        fragmentShader,

        uniforms: {
            uSize: { value: 30 * renderer.getPixelRatio() },

            uTime: { value: 0.0 }
        }

    })


    gui.add(material.uniforms.uSize, 'value').min(0.0).max(100.0).step(0.0001).name('Particle Size');

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    scene.add(points)
}


gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)


let ugeometry = null
let umaterial = null
let upoints = null

const generateUniverse = () => {

    if(upoints != null) {
        umaterial.dispose();
        ugeometry.dispose();
        scene.remove(upoints);
    }

    const count = 20000;

    const position = new Float32Array(count * 3);
    const scale = new Float32Array(count);

    ugeometry = new THREE.BufferGeometry();

    for(let i=0; i<count; i++) {

        position[i * 3 + 0] = (Math.random() - 0.5) * 500 + 5;
        position[i * 3 + 1] = (Math.random() - 0.5) * 500 + 5;
        position[i * 3 + 2] = (Math.random() - 0.5) * 500 + 5;

        scale[i] = Math.random();
    }

    ugeometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
    ugeometry.setAttribute('aScale', new THREE.Float32BufferAttribute(scale, 1));

    umaterial = new THREE.ShaderMaterial({
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader: uvertexShader,
        fragmentShader: ufragmentShader,
        
        uniforms: {
            uSize: { value: 50 * renderer.getPixelRatio() },

            uTime: { value: 0.0 }
        }

    });

    upoints = new THREE.Points(ugeometry, umaterial);
    scene.add(upoints);

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

    // Time
    material.uniforms.uTime.value = elapsedTime;
    
    // Update controls
    controls.update()
    
    // Render
    renderer.render(scene, camera)
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

generateUniverse();
generateGalaxy()
tick()