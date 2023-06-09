import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Experience from './Experience/Experience'
// import Robot from './classes/Robot';
// import FlyingRobot from './classes/FlyingRobot';


// class Robot {                  // Use Pasal Case
//     constructor(name, legs) {                // Contructor are called authomateical when an instance is created
//         // console.log('Will always be called');
//         // name can be used everywhere in constructor but this.name is avaiable everywhere in class
//         this.name = name;                 // To use the name in whole class of a particular instance
//         this.legs = legs;
//         console.log(`I am ${this.name}. Thank You Creater`);
//         this.sayHi();           // a method can be called inside another method
//     }
//     sayHi() {                  // Methods   --> Functions inside class
//         console.log(`hoal, my name is ${this.name}. I have ${this.legs} legs.`);
//     }
    
// }  

// console.log(wallE.name)
// console.log(ultron.name)
// console.log(astroBoy.name)

// console.log(wallE.legs)
// console.log(ultron.legs)
// console.log(astroBoy.legs)

// wallE.sayHi();
// ultron.sayHi();
// astroBoy.sayHi();


// to extend Class from another class

// class FlyingRobot extends Robot {            // Inheirtance
//     // All those code from Robot is implemented if an instance of FlyingRobot is created;
//     constructor(name, legs) {  // Nothing Special The code written Inside Is merged with initial constructor
//         super(name, legs);             // Need To use this to overwrite constructor
//         // Super is used to refer to parent class
//         // super.sayHi();               // to implement the parent class
//         console.log(`I am ${this.name}. Thank You To Create Your Destroyer :) `);
//     }

//     takeOf() {
//         console.log(`Have A Good Flight ${this.name}`);
//     }

//     landing() {
//         console.log(`That was a hell off a trip, you ${this.legs} legged bitch`);
//     }

//     sayHi() {        // Overwriting      --> Every Method other than constructor can be overwritten as this
//         console.log('OverWriting SyHi')
//     }

// }


// parameters passed inside constructor are called properties and can be used outside the class also
// const wallE = new Robot('WallE', 5);    // This is an instance of the class use camel Case
// const ultron = new FlyingRobot('Ultron', 4);
// const astroBoy = new FlyingRobot('AstroBoy', 0);

// ultron.sayHi();
// ultron.takeOf();
// ultron.landing();

// First the constructor of parent is implemented then the local contructor


/**
 * Experience
 */

const experience = new Experience(document.querySelector('.webgl'));              // The Properties can be changed accordingly making the code usefull by other coders
// console.log(experience)



/**
 * Loaders
 */
// const gltfLoader = new GLTFLoader()
// const textureLoader = new THREE.TextureLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader()

// /**
//  * Base
//  */
// // Debug
// const gui = new dat.GUI()
// const debugObject = {}

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Update all materials
//  */
// const updateAllMaterials = () =>
// {
//     scene.traverse((child) =>
//     {
//         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
//         {
//             // child.material.envMap = environmentMap
//             child.material.envMapIntensity = debugObject.envMapIntensity
//             child.material.needsUpdate = true
//             child.castShadow = true
//             child.receiveShadow = true
//         }
//     })
// }

// /**
//  * Environment map
//  */
// const environmentMap = cubeTextureLoader.load([
//     '/textures/environmentMap/px.jpg',
//     '/textures/environmentMap/nx.jpg',
//     '/textures/environmentMap/py.jpg',
//     '/textures/environmentMap/ny.jpg',
//     '/textures/environmentMap/pz.jpg',
//     '/textures/environmentMap/nz.jpg'
// ])

// environmentMap.encoding = THREE.sRGBEncoding

// // scene.background = environmentMap
// scene.environment = environmentMap

// debugObject.envMapIntensity = 0.4
// gui.add(debugObject, 'envMapIntensity').min(0).max(4).step(0.001).onChange(updateAllMaterials)

// /**
//  * Models
//  */
// let foxMixer = null

// gltfLoader.load(
//     '/models/Fox/glTF/Fox.gltf',
//     (gltf) =>
//     {
//         // Model
//         gltf.scene.scale.set(0.02, 0.02, 0.02)
//         scene.add(gltf.scene)

//         // Animation
//         foxMixer = new THREE.AnimationMixer(gltf.scene)
//         const foxAction = foxMixer.clipAction(gltf.animations[0])
//         foxAction.play()

//         // Update materials
//         updateAllMaterials()
//     }
// )

// /**
//  * Floor
//  */
// const floorColorTexture = textureLoader.load('textures/dirt/color.jpg')
// floorColorTexture.encoding = THREE.sRGBEncoding
// floorColorTexture.repeat.set(1.5, 1.5)
// floorColorTexture.wrapS = THREE.RepeatWrapping
// floorColorTexture.wrapT = THREE.RepeatWrapping

// const floorNormalTexture = textureLoader.load('textures/dirt/normal.jpg')
// floorNormalTexture.repeat.set(1.5, 1.5)
// floorNormalTexture.wrapS = THREE.RepeatWrapping
// floorNormalTexture.wrapT = THREE.RepeatWrapping

// const floorGeometry = new THREE.CircleGeometry(5, 64)
// const floorMaterial = new THREE.MeshStandardMaterial({
//     map: floorColorTexture,
//     normalMap: floorNormalTexture
// })
// const floor = new THREE.Mesh(floorGeometry, floorMaterial)
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

// /**
//  * Lights
//  */
// const directionalLight = new THREE.DirectionalLight('#ffffff', 4)
// directionalLight.castShadow = true
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.normalBias = 0.05
// directionalLight.position.set(3.5, 2, - 1.25)
// scene.add(directionalLight)

// gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
// gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
// gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
// gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(6, 4, 8)
// // scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true
// })
// renderer.physicallyCorrectLights = true
// renderer.outputEncoding = THREE.sRGBEncoding
// renderer.toneMapping = THREE.CineonToneMapping
// renderer.toneMappingExposure = 1.75
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.setClearColor('#211d20')
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// let previousTime = 0

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - previousTime
//     previousTime = elapsedTime

//     // Update controls
//     controls.update()

//     // Fox animation
//     if(foxMixer)
//     {
//         foxMixer.update(deltaTime)
//     }

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()