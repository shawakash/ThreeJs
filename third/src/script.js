import './style.css'
import * as THREE from 'three'

// You can change the camera for transformation as well as the mesh as they both lie in Object3D package


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 0.7       // unit can be anything
mesh.position.y = -0.6;
mesh.position.z = -1;

// Place of position matters ---- It works only anywhere before renderer
// Best way is to put before the scene

console.log(mesh.position.length)     // to get distance between the center of the scene and the geometry i.e. a vector

scene.add(mesh)

/**
 * Sizes
*/
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
console.log(mesh.position.distanceTo(camera.position))   // to get the distance from another verctor
// think it like a film set
// Where camera and scene and mesh and objects is placed and your are trying to connect then with vectors
// distance to helps to get distance between any two of those vestors


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)