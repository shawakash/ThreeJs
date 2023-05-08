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

// Fog
// Takes color , how far from camera it to start, upto where it will go
const fog = new THREE.Fog('#262837', 1, 15);
scene.fog = fog;


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorAlpha = textureLoader.load('textures/door/alpha.jpg');
const doorAmbient = textureLoader.load('textures/door/ambientOcclusion.jpg');
const doorColor = textureLoader.load('textures/door/color.jpg');
const doorHeight = textureLoader.load('textures/door/height.jpg');
const doorMetalness = textureLoader.load('textures/door/metalness.jpg');
const doorNormal = textureLoader.load('textures/door/normal.jpg');
const doorRoughness = textureLoader.load('textures/door/roughness.jpg');
const bricksAmbient = textureLoader.load('textures/bricks/ambientOcclusion.jpg');
const bricksColor = textureLoader.load('textures/bricks/color.jpg');
const bricksNormal = textureLoader.load('textures/bricks/normal.jpg');
const bricksRoughness = textureLoader.load('textures/bricks/roughness.jpg');
const bushAmbient = textureLoader.load('textures/grass/ambientOcclusion.jpg');
const bushColor = textureLoader.load('textures/grass/color.jpg');
const bushNormal = textureLoader.load('textures/grass/normal.jpg');
const bushRoughness = textureLoader.load('textures/grass/roughness.jpg');
bushColor.repeat.set(8, 8);
bushRoughness.repeat.set(8, 8);
bricksNormal.repeat.set(8, 8);
bushAmbient.repeat.set(8, 8);

bushColor.wrapS = THREE.RepeatWrapping
bushRoughness.wrapS = THREE.RepeatWrapping
bricksNormal.wrapS = THREE.RepeatWrapping
bushAmbient.wrapS = THREE.RepeatWrapping

bushColor.wrapT = THREE.RepeatWrapping
bushRoughness.wrapT = THREE.RepeatWrapping
bricksNormal.wrapT = THREE.RepeatWrapping
bushAmbient.wrapT = THREE.RepeatWrapping



/**
 * House
 */

const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColor,
        aoMap: bricksAmbient,
        normalMap: bricksNormal,
        roughnessMap: bricksRoughness
    })
);
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float16BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.set(0, 1.25, 0)

house.add(walls);

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.position.y = 1 / 2 + 2.5;
roof.rotation.y = Math.PI * 0.25

house.add(roof)

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColor,
        aoMap: doorAmbient,
        transparent: true,
        alphaMap: doorAlpha,
        metalnessMap: doorMetalness,
        normalMap: doorNormal,
        displacementMap: doorHeight,
        displacementScale: 0.1,
        roughnessMap: doorRoughness
    })
);
door.geometry.setAttribute(
    'uv2',
    new THREE.Float16BufferAttribute(door.geometry.attributes.uv.array,
        2
    )
);
door.position.y = 0.95;
door.position.z = 4 / 2 + 0.0001;

house.add(door)


// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 160, 160);
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColor,
    aoMap: bushAmbient,
    normalMap: bushNormal,
    roughnessMap: bushRoughness
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);
bush1.geometry.setAttribute(
    'uv2',
    new THREE.Float16BufferAttribute(bush1.geometry.attributes.uv.array, 2)
);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.geometry.setAttribute(
    'uv2',
    new THREE.Float16BufferAttribute(bush2.geometry.attributes.uv.array, 2)
);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.geometry.setAttribute(
    'uv2',
    new THREE.Float16BufferAttribute(bush3.geometry.attributes.uv.array, 2)
);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.geometry.setAttribute(
    'uv2',
    new THREE.Float16BufferAttribute(bush4.geometry.attributes.uv.array, 2)
);

house.add(bush1, bush2, bush3, bush4)

// Graves

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 4 + 5 * Math.random();
    const z = radius * Math.cos(angle) - 0.0001;
    const x = radius * Math.sin(angle) - 0.0001;
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.position.set(x, 0.3, z);
    grave.rotation.y = (Math.random() - 0.5) * 0.5;
    grave.rotation.z = (Math.random() - 0.5) * 0.5;
    grave.castShadow = true;    
    graves.add(grave);
}


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: bushColor,
        aoMap: bushAmbient,
        normalMap: bushNormal,
        roughnessMap: bushRoughness
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.geometry.setAttribute(
    'uv2',
    new THREE.Float16BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)


const doorLight = new THREE.PointLight('#ff7d47', 1, 7);
doorLight.position.set(0, 2.2, 2.7)

house.add(doorLight)


/**
 * Ghost
 */

const ghost1 = new THREE.PointLight('#ff00ff', 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff', 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00', 2, 3);
scene.add(ghost3);


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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#262837');   // Makes the color to be visible all around space


/**
 * Shadows
 */
renderer.shadowMap.enabled = true;  
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;



/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update();

    // Update Ghost
    const ghost1angle = elapsedTime * 0.5; 
    ghost1.position.x = 4 * Math.cos(ghost1angle);
    ghost1.position.z = 4 * Math.sin(ghost1angle);
    ghost1.position.y = Math.sin(elapsedTime * 3);
    
    const ghost2angle = - elapsedTime * 0.32; 
    ghost2.position.x = 5 * Math.cos(ghost2angle);
    ghost2.position.z = 5 * Math.sin(ghost2angle);
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3angle = - elapsedTime * 0.18; 
    ghost3.position.x = (Math.cos(elapsedTime * 0.32) + 7) * Math.cos(ghost3angle);
    ghost3.position.z = (Math.sin(elapsedTime * 0.5) + 7) * Math.sin(ghost3angle);
    ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2);
    
    


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()