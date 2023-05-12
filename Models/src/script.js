import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


/**
 * Models are object created other than threeJs objects for a better experience
 * For different models we have different formats
 * We need to choose formats wisely
 * We have different criteria based on different formats
 * OBJ, FBX, STL
 * 
 * different formats contain different ectensions
 * like GLTL provides you with a default, dracos, bin, embedded
 *  default file contains all the information about mesh like material, loader, and it also connects .png(texture) and geometry file
 * bin file also contain the same but it is modifiable
 * Dracos file is like default file with everything compressed
 * Embedded file contains all information including textures, geometries
 * 
 * Make changes in your code with respect to the gltl material
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
 * Gltl loader
 */
const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = () => {
    console.log('Loaded');
}
loadingManager.onError = (e) => {
    console.log(e);
}
loadingManager.onProgress = () => {
    console.log('Progressing');
}
loadingManager.onStart = () => {
    console.log('Started');
}

// Draco Is much much lighter than gltf
// Load the draco loader much before the gltf loader
// Draco Loader works with Gltf loader

// When to use Draco
// It is light but the dracoloader and the decoder are very heavy'
// so we load heavy data to load small data
// Use it wisely
// It may freeze the system

const gltlDracoLoader = new DRACOLoader(loadingManager);
gltlDracoLoader.setDecoderPath('draco/');               // for webassembly and Walker

const gltlLoader = new GLTFLoader(loadingManager);
gltlLoader.setDRACOLoader(gltlDracoLoader);
let duck = null;

gltlLoader.load(
    'models/Duck/glTF/Duck.gltf',
    (gltf) => {
        duck = gltf.scene;
        scene.add(duck);
    }
)






// const gltlLoader = new GLTFLoader(loadingManager);
// let duck = null;
// gltlLoader.load(
//     'models/Duck/glTF/Duck.gltf',              // change the format to dracos or bin or embedded

//     (gltf) => {   // Load

//         // check the structure before adding
//         console.log(gltf);

//         // duck = gltf.scene.children[0];                  //   only the first elementt of the group, with this you need to apply
//         // Maybe you want to loop over the whole array and addd indivual to the scene  -->> it doesn't works
//         // when you add one , one is removed from the loop
//         // Solution -> use while loop while(gltf.scene.children.lenght) { scene.add(gltf.scene.children[0]) }
//         // other is const meshes = [...gltf.scene.children]  apply loop on meshes

//         // duck = gltf.scene.children[0].children[1];     // -> unscaled version and only the first element of group
//         duck = gltf.scene;                               //  whole group
//         scene.add(duck)
//     },

//     // Progress
//     () => {

//     },

//     // Error
//     (err) => {
//         console.error(err);
//     }

// );




/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Duck
    if (duck != null) {
        duck.rotation.y = elapsedTime * .5
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()