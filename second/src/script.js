import './style.css'
import {camelCase, upperCase} from 'lodash'
import * as THREE from 'three'


const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'blue' });
const mess = new THREE.Mesh(geometry, material);
Mesh.position.y = 2;
scene.add(mess);

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera( 45, sizes.width / sizes.height );
camera.position.z = 3;
scene.add(camera);

const canvas = document.querySelector('.webjl');
const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera)

