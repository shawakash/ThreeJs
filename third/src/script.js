import './style.css'
import * as THREE from 'three'

// You can change the camera for transformation as well as the mesh as they both lie in Object3D package


const pi = Math.PI;

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const group1 = new THREE.Group();
scene.add(group1);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'cyan' })
);
group1.add(cube);
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 100, 100),
    new THREE.MeshBasicMaterial({ color: 'red' })
);
group1.add(sphere);

group1.position.set(3, 0, 0);
group1.rotation.z = pi / 4;
group1.scale.set(0.5, 0.5, 0.5)

const group2 = new THREE.Group();
scene.add(group2);

const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1, 5, 200, 200),
    new THREE.MeshBasicMaterial({ color: 'white' })
);
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.5, 200, 200),
    new THREE.MeshBasicMaterial({ color: 'purple' })
);
torus.rotation.x = pi/2;
group2.add(cone);
group2.add(torus);
group2.scale.set(0.5, 0.5, 0.5)
group2.rotation.x = pi/2;


/**
 * Sizes
*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)

camera.position.set(5, 1, 2)
camera.lookAt(group1.position)

// To display the axess
const axes = new THREE.AxesHelper(100);    // takes paramerter as the length of displaying axes
scene.add(axes)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)