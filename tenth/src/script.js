import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

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

/**
 * Env Textures 
*/ 
const envTextureLoader = new THREE.CubeTextureLoader(loadingManager);

// Order of textures are very important
const envTextures = envTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',
]);

const textureLoader = new THREE.TextureLoader(loadingManager);

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matcap1Texture = textureLoader.load('/textures/matcaps/1.png');
const matcap2Texture = textureLoader.load('/textures/matcaps/2.png');
const matcap3Texture = textureLoader.load('/textures/matcaps/3.png');
const matcap4Texture = textureLoader.load('/textures/matcaps/4.png');
const matcap5Texture = textureLoader.load('/textures/matcaps/5.png');
const matcap6Texture = textureLoader.load('/textures/matcaps/6.png');
const matcap7Texture = textureLoader.load('/textures/matcaps/7.png');
const matcap8Texture = textureLoader.load('/textures/matcaps/8.png');
const gradient3Texture = textureLoader.load('/textures/gradients/3.jpg')
const gradient5Texture = textureLoader.load('/textures/gradients/5.jpg')


/**
 *  Object
 */

// const material = new THREE.MeshBasicMaterial();

// Setting the texture
doorColorTexture.minFilter = THREE.NearestFilter
doorColorTexture.magFilter = THREE.NearestFilter
doorColorTexture.generateMipmaps = false;

gradient5Texture.minFilter = THREE.NearestFilter
gradient5Texture.magFilter = THREE.NearestFilter
gradient5Texture.generateMipmaps = false;

// material.map = doorColorTexture    // remember to assign the correct dataType
// like material.color = 'red'    doesn't works as material.color is a THREE.Color Object
// material.color.set('yellow')
// material.color = new THREE.Color('red');   // Value is any valid color code
// material.wireframe = true;     // For Triangles

// Opacity and Transparent Bhai Bhai
// material.opacity = 0.5;
// material.transparent = true;

// For alpha map add transparent = true
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// To maintain the side visibilty for orbit controlls
// material.side = THREE.FrontSide
// material.side = THREE.BackSide
// material.side = THREE.DoubleSide   // Not Preferrable For Gpu

// MeshNormalMaterial
// Normal are the information that stores value for outside of the geometry or Textures
// Noramls are used for Lightning, Reflection, Refraction
// const material = new THREE.MeshNormalMaterial();            //   ---->>>> Just Beautifull  // Used to debug normals
// material.wireframe = true;
// material.flatShading = true;     // to flaten the surface, means normal won't be interpolated between the surface;  means you can see the faces

// const material = new THREE.MeshMatcapMaterial();   // To use normal perfectly
// material.matcap = matcap8Texture ;

// const material = new THREE.MeshDepthMaterial()    // Turns white when looked from close and dims when moved far. Usefull for fogs

// Material that respones to Lights
// Doesn't Provides Reflection instead provides a unwanted line pattern
// const material = new THREE.MeshLambertMaterial();

// Alternative to MeshLamber
// Provides Reflection to light falling on it
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;   // To shine Mas'

// material.specular = new THREE.Color('red')

// A cartoon Type material; mainly used for gradients
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradient5Texture

// Best of PHONG AND LAMBER
// Mesh Standard Material Uses PBR (Physcially based Render), i.e. it uses algorithms that are derived to depect the exact way the material would respond once in real world
// PointsMaterial For Particals
// const material = new THREE.MeshStandardMaterial();  // Or Physcial Material 
// // For the ambient to apply we need to add its coordinates itself as threejs itself doesn't provides coordinatesfor abient;
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture;
// // To change the intensity of the ambientOcclusion we use 
// material.aoMapIntensity = 1;

// // To provide terrain or relif to the textures
// // To apply it properly provide enough vertices i.e. increase the segments of geomtries
// material.displacementMap = doorHeightTexture;

// // To apply Terrain to certain level;
// material.displacementScale = 0.071;

// // FOR Metalness and roughness
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// // To scale normal
// material.normalScale.set(0.5, 0.5);



// gui
//     .add(material.normalScale, 'x')
//     .min(0)
//     .max(1)
//     .step(0.001)
//     .name("Normal Scale X")

// gui
//     .add(material.normalScale, 'y')
//     .min(0)
//     .max(1)
//     .step(0.001)
//     .name("Normal Scale Y")

// gui
//     .add(material, 'displacementScale')
//     .min(0)
//     .max(0.1)
//     .step(0.0001)
//     .name('Terrain Scale');

// gui
//     .add(material, 'aoMapIntensity')
//     .min(0)
//     .max(10)
//     .step(0.0001)
//     .name('AO Intensity');



// Enviorments Maps ---->>>> As the name suggests


const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;

// Maps the reflection of enviorments to material
material.envMap = envTextures;
material.envMapIntensity = 0.8


gui
    .add(material, 'envMapIntensity')
    .min(0)
    .max(1)
    .step(0.0001)
    .name('Env Intensity');


    gui
    .add(material, 'roughness')
    .min(0)
    .max(1)
    .step(0.0001)
    .name('Roughness');

gui
    .add(material, 'metalness')
    .min(0)
    .max(1)
    .step(0.0001)
    .name('Metalness');



const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 160, 160),
    material
);

// For the ambient to apply we need to add its coordinates itself as threejs itself doesn't provides coordinatesfor abient;
sphere.geometry.setAttribute('uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
);

plane.geometry.setAttribute('uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 160, 320),
    material
);

torus.geometry.setAttribute('uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

torus.position.x = 1.5;

scene.add(torus, plane, sphere)

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointerLight = new THREE.PointLight(0xffffff);

gui
    .add(pointerLight.position, 'x')
    .min(0)
    .max(6)
    .step(0.00001)
    .name("X's Lights");
gui
    .add(pointerLight.position, 'y')
    .min(0)
    .max(6)
    .step(0.00001)
    .name("Y's Lights");
gui
    .add(pointerLight.position, 'z')
    .min(0)
    .max(6)
    .step(0.00001)
    .name("Z's Lights");

scene.add(pointerLight);

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

const tick = () => {
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