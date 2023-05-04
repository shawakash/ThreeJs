import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matcap1Texture= textureLoader.load('/textures/matcaps/1.png');
const matcap2Texture = textureLoader.load('/textures/matcaps/2.png');
const matcap3Texture= textureLoader.load('/textures/matcaps/3.png');
const matcap4Texture = textureLoader.load('/textures/matcaps/4.png');
const matcap5Textureure = textureLoader.load('/textures/matcaps/5.png');
const matcap6Texture = textureLoader.load('/textures/matcaps/6.png');
const matcap7Texture = textureLoader.load('/textures/matcaps/7.png');
const matcap8Texture = textureLoader.load('/textures/matcaps/8.png');
const gradient3Texture = textureLoader.load('/textures/gradients/3.jpg')


/**
 *  Object
 */

const material = new THREE.MeshBasicMaterial();
material.map = doorRoughnessTexture    // remember to assign the correct dataType
// like material.color = 'red'    doesn't works as material.color is a THREE.Color Object
// material.color.set('yellow')
material.color = new THREE.Color('red');   // Value is any valid color code

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
);

sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
);
torus.position.x = 1.5;

scene.add(torus, plane, sphere)


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
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Objects
    sphere.rotation.y = elapsedTime * .2;
    sphere.rotation.x = elapsedTime * .2;

    plane.rotation.y = elapsedTime * .2;
    plane.rotation.x = elapsedTime * .2;

    torus.rotation.y = elapsedTime * .2;
    torus.rotation.x = elapsedTime * .2;


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()