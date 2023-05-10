'use strict'

// Avoid Using anything in mousemove eventListner as it triggers more than requestanimate

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

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
 * Raycaster casts an ray in a specific direction and test what objects intersects it
 * detect if a gun points to a direction hits the target
 * an spaceship is reaching a planet
 */


/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Raycaster
 * 
 */


const raycaster = new THREE.Raycaster() // tAKES AN ORIGIN AND A DIRECTION
const rayOrigin = new THREE.Vector3(-3, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0);
rayDirection.normalize();                  //  --->>>> Most important  , takes a unit vector

raycaster.set(rayOrigin, rayDirection)
// console.log(raycaster)

const intersect = raycaster.intersectObject(object1);    // to test if the ray intersect one object
// returns a empty array if it doesn't intersects
// Returns an array as it can intersect a same object twice, e.g. torus
// console.log(intersect);

const intersects =  raycaster.intersectObjects([object1, object2, object3])  // to test multiple objects 
// Takes an array
// returns a empty array if it doesn't intersects
// console.log(intersects);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
    mouse.set((e.clientX / sizes.width) * 2 - 1, 1 - (e.clientY / sizes.height) * 2 );
})

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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate Object
    object1.position.y = Math.sin(elapsedTime * 3.3 + object1.position.x) * 2;
    object2.position.y = Math.sin(elapsedTime * 3.3 + object2.position.x) * 2;
    object3.position.y = Math.sin(elapsedTime * 3.3 + object3.position.x) * 2;

    // raycaster
    // const rayOrigin = new THREE.Vector3(-3, 0, 0);
    // const rayDirection = new THREE.Vector3(1, 0, 0);
    // rayDirection.normalize();

    // raycaster.set(rayOrigin, rayDirection);

    // const testObject = [
    //     object1,
    //     object2,
    //     object3
    // ];

    // const intersects = raycaster.intersectObjects(testObject);

    // testObject.forEach(object => {
    //     object.material.color.set('red');
    //     object.material.wireframe = false;
    // });

    // intersects.forEach(intersect => {
    //     intersect.object.material.wireframe = true;             // Applied to all as at start it was all at origin so we didn't set it back
    //     intersect.object.material.color.set('cyan');    
    // });

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()