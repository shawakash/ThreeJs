import './style.css'
import * as THREE from 'three'

const pi = Math.PI
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'cyan' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


//===>>>> let initialTime = Date.now();
//===>>>> Date.now has a value of time in milli-seconds since the starting of year
//===>>>> Another way is to set a CLOCK at the starting of your website

const clock = new THREE.Clock();


// Animation
const tick = () => {

    // let currentTime = Date.now();
    // let delta = currentTime - initialTime;
    // initialTime = currentTime;  // update the time
    let elapsedTime = clock.getElapsedTime();

    // transform the group once
    mesh.rotation.x = pi * elapsedTime;          // radians you want to rotate per second * elapsedTime
    mesh.rotation.y = pi * elapsedTime;
    mesh.rotation.z = pi * elapsedTime;

    // mesh.position.x = Math.sin(elapsedTime*5)
    // mesh.position.y = 2*Math.cos(elapsedTime*5)
    // camera.position.x = Math.sin(elapsedTime*5)
    // camera.position.y = 2*Math.cos(elapsedTime*5)
    // camera.lookAt(mesh.position)

    // Render The Scene once
    renderer.render(scene, camera)

    // Call It Recurivly
    // Rate of animation depends on FPS rating of cpu   ---> use time dfference as time is the only thing which is constant for all, or it isn't ?
    window.requestAnimationFrame(tick);
}

tick()