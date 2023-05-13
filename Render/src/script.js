import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


/**
 * Base
*/
// Debug
const gui = new dat.GUI({ width: 360 });
const debugObject = {};

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Update All material;
*/

const updateAllMaterials = () => {
    scene.traverse(child => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.material.envMap = envTexture;
            child.material.envMapIntensity = debugObject.envIntensity;
        }
    })
}



/**
 * Env Map Texture
*/
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envTexture = cubeTextureLoader.load([
    'textures/environmentMaps/0/px.jpg',
    'textures/environmentMaps/0/nx.jpg',
    'textures/environmentMaps/0/py.jpg',
    'textures/environmentMaps/0/ny.jpg',
    'textures/environmentMaps/0/pz.jpg',
    'textures/environmentMaps/0/nz.jpg',
]);

envTexture.encoding = THREE.sRGBEncoding;

scene.background = envTexture;
scene.environment = envTexture;    // This apply the envMap to all the Meshes Present In Scene So no need to call the function

debugObject.envIntensity = 1;
const debug = gui.addFolder('Debug');
debug.add(debugObject, 'envIntensity').min(0).min(10).step(0.01).name('Env Map Intensity').onChange(updateAllMaterials)




/**
 * lOADERS
 */

// Gltf loaders automatically encodes the model texture to sRGBencoding
// Tone Mapping Converts the HDR(High Dynamic Range) to LDR(Low Dynamic Range)
// Hdr contains thing more than color, it contains color information expanding 1 i.e. white(1) and black(0)
// But the assets used here is not inlined with hdr, so we need to convert it ti hdr for realistic effect
// It is done by tone mapping --> squeezing the value
// Encoding uses the same technique


const gltfLoader = new GLTFLoader();
let flightHelmet = null;
gltfLoader.load(
    'models/FlightHelmet/glTF/FlightHelmet.gltf',

    (glTF) => {
        console.log(glTF);
        flightHelmet = glTF.scene;
        flightHelmet.scale.set(10, 10, 10);
        flightHelmet.position.set(0, -4, 0)
        flightHelmet.rotation.y = Math.PI * 0.5;
        scene.add(flightHelmet);
        
        // updateAllMaterials();
        gui.add(flightHelmet.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001).name("Helmet Rotation Y");
    }
)


/**
 * Test Sphere
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 100, 100),
    new THREE.MeshStandardMaterial({
        metalness: 1,
        roughness: 0.1
    })
)
sphere.position.set(5, 0, 0)
scene.add(sphere)



/**
 * Lights
*/
const ambientLight = new THREE.AmbientLight('#ffffff', .3);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
directionalLight.position.set(0.25, 3, -2.25)
scene.add(directionalLight);

gui.add(directionalLight, 'intensity').min(0.01).max(10).step(0.001).name('Light Intensity');
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.0001).name('Light x');
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.0001).name('Light Y');
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.0001).name('Light Z');




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
camera.position.set(4, 1, - 4)
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
renderer.physicallyCorrectLights = true;

// OutputEncoding controls the output renderer encoding
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping; // ---NEW wAY
renderer.toneMappingeExposure = 3;

gui.add(renderer, 'toneMappingeExposure').min(0).max(10).step(0.001).name('Tone Exposure');
gui.add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Rien: THREE.ReinhardToneMapping,
    Cinenon: THREE.CineonToneMapping,
    Aces: THREE.ACESFilmicToneMapping
});

/**
 * Animate
 */
const tick = () => {
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()