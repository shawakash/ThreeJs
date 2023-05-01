import './style.css'
import * as THREE from 'three'

// You can change the camera for transformation as well as the mesh as they both lie in Object3D package


const pi = Math.PI;

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 2, 1)
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

console.log(mesh.position.normalize())     // this reduces the disance between vectors to one;
console.log(mesh.position.length())

// to update all together
mesh.position.set(5, 2, 0)

// To display the axess
const axes = new THREE.AxesHelper(100);    // takes paramerter as the length of displaying axes
scene.add(axes)
camera.position.set(5,4,11)

// Scale

mesh.scale.x = 2
mesh.scale.y = 2
// mesh.scale.z = 2

//  || 
mesh.scale.set(4,3)


// Rotation 
// Takes value in radian
// Rotation not only changes the angle but also the axes
// to avoid meshing up use reorder before rotation 
// It rotate the mesh in the order provided
mesh.rotation.reorder('XYZ')
mesh.rotation.z = pi/6
mesh.rotation.x = pi/3
mesh.rotation.y = pi/5


// lookAt ===>>>> to shift the camera focus to different origin
camera.lookAt(mesh.position)

// To group objects so that a whole set of transformation applies to them without indiviual applying to each one




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)