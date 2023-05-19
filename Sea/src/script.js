import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import waterVertexShader from './shaders/water/vertex.glsl'
import waterFragmentShader from './shaders/water/fragment.glsl'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 });
const debugObject = {};
debugObject.surfaceColor = '#9bd8ff';
debugObject.depthColor = '#186691';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(20, 20, 128, 128)

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    side: THREE.DoubleSide,
    uniforms: {

        uTime: { value: 0.0 },

        uBigWaveElevation: { value: 0.3 },
        uRandom: { value: Math.random() },
        uBigWaveFrequency: { value: new THREE.Vector2(5.0, 4.0) },
        uBigWaveSpeed: { value: new THREE.Vector2(4.4, 0.75) },

        uWaveDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uWaveSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uElevationStrength: { value: new THREE.Vector2(1.4, 0.2) }

    }
})

const uniforms = gui.addFolder('Uniforms');
const debugWater = uniforms.addFolder('Water');
debugWater.add(waterMaterial.uniforms.uBigWaveElevation, 'value').min(0.0).max(1.0).step(0.00001).name('Water Elevation');
debugWater.add(waterMaterial.uniforms.uBigWaveFrequency.value, 'x').min(0.0).max(20.0).step(0.01).name('Water Frequency X');
debugWater.add(waterMaterial.uniforms.uBigWaveFrequency.value, 'y').min(0.0).max(20.0).step(0.01).name('Water Frequency Y');
debugWater.add(waterMaterial.uniforms.uBigWaveSpeed.value, 'x').min(0.0).max(20.0).step(0.0001).name('Water Speed X');
debugWater.add(waterMaterial.uniforms.uBigWaveSpeed.value, 'y').min(0.0).max(20.0).step(0.0001).name('Water Speed Z');

debugWater.add(waterMaterial.uniforms.uElevationStrength.value, 'x').min(0.0).max(20.0).step(0.0001).name('Color Strength');
debugWater.add(waterMaterial.uniforms.uElevationStrength.value, 'y').min(0.0).max(1.0).step(0.0001).name('Color Strength offset');

debugWater.addColor(debugObject, 'surfaceColor').onChange(() => {
    waterMaterial.uniforms.uWaveSurfaceColor.value.set(debugObject.surfaceColor)
});
debugWater.addColor(debugObject, 'depthColor').onChange(() => {
    waterMaterial.uniforms.uWaveDepthColor.value.set(debugObject.depthColor)
});

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

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
camera.position.set(1, 1, 1)
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

    // ShaderAnimation
    waterMaterial.uniforms.uTime.value = elapsedTime;
    // waterMaterial.uniforms.uRandom.value = Math.random();

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()