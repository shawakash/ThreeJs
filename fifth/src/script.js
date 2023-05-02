import './style.css'
import * as THREE from 'three'


/**
 * Base
*/
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/**
 * Mouse Coordimates
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (ev) => {
    cursor.x = ((ev.clientX / sizes.width) - 0.5) ;
    cursor.y = ((ev.clientY / sizes.height) - 0.5);
    // console.log(cursor);
});


// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 1000, 1000, 1000),
    new THREE.MeshBasicMaterial({ color: 'white' })
)
// mesh.position.z = 6
scene.add(mesh)

const axesHelper = new THREE.AxesHelper(30);
// scene.add(axesHelper)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 100)

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//     40 * aspectRatio,
//     40, 
//     40, 
//     40, 
//     1, 
//     100
// );


// Any Object >far and  <near won't be visible
// camera.position.x = 20
// camera.position.y = 20
camera.position.z = 6
// camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;
    // mesh.rotation.z = elapsedTime;
    // mesh.rotation.x = elapsedTime;

    // Update Camera
    camera.position.x = cursor.x * 11
    camera.position.y = cursor.y * 11
    camera.lookAt(new THREE.Vector3());

    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()