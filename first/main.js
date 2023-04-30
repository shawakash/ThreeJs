// import * as THREE from 'three'
// Scene
const scene = new THREE.Scene();

// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes 
const sizes = {
    width: 800,
    heigth: 600
}

//  Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.heigth);
camera.position.z = 3; 
scene.add(camera)

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(sizes.width, sizes.heigth);
renderer.render(scene, camera)
