import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import CANNON from 'cannon'

/**
 * Ammo.js
 * Cannon.js
 * Oimo.js
 * Matter.js
 * P2.js
 * Plank.js
 * 
 * 
 * So basically we create a world  or a canvas called physics world where laws of physics govern
 * we create a shape, body and observe how it behave in presence of gravity or these laws;
 * and then we mimics or copy the positions into threejs meshes
 * 
 * 
 * You can do all the same work as in threeJs in CannonJs with:
 * 
 * (shape, Body)  <<<<==>>>>  (geometry, Material)
 * 
 */

/**
 * Debug
 */
const gui = new dat.GUI({ width: 360 });
const debugObject = {};
debugObject.reset = () => {
    objectToUpdate.map(({body, mesh}) => {
        scene.remove(mesh);
        world.remove(body);
    })
    objectToUpdate.splice(0, objectToUpdate.length);
};
debugObject.createSphere = () => {
    createSphere(
        Math.random() * 0.5,
        {
            x: (Math.random() - 0.5) * 5,
            y: 3,
            z: (Math.random() - 0.5) * 5
        }
    )
};
debugObject.createBox = () => {
    createBox(
        {
            x: Math.random() + 0.001,
            y: Math.random() + 0.001,
            z: Math.random() + 0.001
        },
        {
            x: (Math.random() - 0.5) * 5,
            y: 3,
            z: (Math.random() - 0.5) * 5
        }
    )
};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Sounds
 */

const hitSound = new Audio('/sounds/hit.mp3');
// create an AudioContext object
const audioContext = new AudioContext();

// create a DelayNode with a delay time of 1 second
const delayNode = audioContext.createDelay(0.5);

// connect the Audio object to the DelayNode
const source = audioContext.createMediaElementSource(hitSound);
source.connect(delayNode);

// connect the DelayNode to the AudioContext destination
delayNode.connect(audioContext.destination);

const playHitSound = (collision) => {
    const impactStrength = collision.contact.getImpactVelocityAlongNormal();

    if (impactStrength > 1.5) {
        hitSound.volume = Math.random() * impactStrength / 15;
        hitSound.currentTime = 0;

        hitSound.play();
    }

}



/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
]);
// environmentMapTexture.wrapS = THREE.RepeatWrapping;
// environmentMapTexture.wrapT = THREE.RepeatWrapping;
// environmentMapTexture.repeat.set(2,2)


/**
 * World
 */

const world = new CANNON.World();
world.gravity.set(0, -9.812, 0);
world.allowSleep = true;                     // Makes the body sleep if its movement is nill -> improves performance
world.broadphase = new CANNON.SAPBroadphase(world);    // see down

// Bodies is an object that fall, collides 
// Material in cannon consist of concret and plastic

// const concretMaterial = new CANNON.Material('concrete');
// const plasticMaterial = new CANNON.Material('plastic');
const defaultMaterial = new CANNON.Material('default');
// Not a good practice to make many materials

// Contact Material -> surface contact

const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.8,
        restitution: 0.6,
        // contactEquationStiffness: 1e8,
        // contactEquationRelaxation: 3,
        // frictionEquationStiffness: 1e8,
        // frictionEquationRelaxation: 3,
    });

world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial;    // Either this or indivual material to bodies

// Sphere
// const sphereShape = new CANNON.Sphere(0.5);
// const sphereBody = new CANNON.Body({
//     mass: 1,
//     position: new CANNON.Vec3(0, 3, 0),
//     shape: sphereShape,
//     // material: defaultMaterial
// });
// sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0))
// world.addBody(sphereBody)



// Cannon Floor
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body();
floorBody.mass = 0;
floorBody.addShape(floorShape);
// floorBody.material = defaultMaterial;

// As plane is initialy rotated so we need to rotate it 
// CANNON Doesn't supports rotation, only qaterion
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0),
    Math.PI * 0.5
)

world.addBody(floorBody)


/**
 * Forces In CANNON Js
 * ApplyForce -->> apply a force in a specific point in space(not necessialry on body surface) like wind, a small push, domino, angry bird
 * applyImpulse -->> apply velocity in place of force, like applyForce
 * applyLocalForce -->> same as applyForce but coordinates are local to the body(0,0,0 would be the center of the body)
 * applyLocalImpluses -->> same as applyImpulse but local to body
 */


/**
 * Test sphere
 */
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// sphere.castShadow = true
// sphere.position.y = 0.5
// scene.add(sphere)





/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(- 3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Utils
 */
let objectToUpdate = []

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5
});

const createSphere = (radius, position) => {

    // ThreeJs Mesh
    const mesh = new THREE.Mesh(
        sphereGeometry,
        sphereMaterial
    );
    mesh.scale.set(radius, radius, radius)
    mesh.castShadow = true;
    mesh.position.copy(position);
    scene.add(mesh);

    // CannonJs Body
    const shape = new CANNON.Sphere(radius);
    const body = new CANNON.Body({
        mass: 1,
        shape,
        material: defaultMaterial
    });
    body.addEventListener('collide', playHitSound)
    body.position.copy(position)
    // body.applyForce(new CANNON.Vec3(150, 0, 0), body.position)
    world.addBody(body);

    // Saving
    objectToUpdate.push({
        body,
        mesh
    })
}

// Boxes
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const createBox = (size, position) => {

    // threeJs

    const mesh = new THREE.Mesh(boxGeometry, sphereMaterial);
    mesh.scale.set(size.x, size.y, size.z);
    mesh.position.copy(position);
    mesh.castShadow = true;
    scene.add(mesh);

    // Cannon
    const shape = new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y / 2, size.z / 2));   // Box TAKES HALF EXTEND
    const body = new CANNON.Body({
        mass: 1,
        shape,
        material: defaultMaterial
    });
    body.addEventListener('collide', playHitSound)
    body.position.copy(position);
    world.addBody(body);

    // Saving Objects
    objectToUpdate.push({
        mesh,
        body
    });
}

// createSphere(0.5, { x: 0, y: 3, z: 0 })  // position can be object, need not to be a vector3 or vec3
// createSphere(0.5, { x: 2, y: 3, z: 2 })  // position can be object, need not to be a vector3 or vec3
// createSphere(0.5, { x: -2, y: 3, z: -2 })  // position can be object, need not to be a vector3 or vec3

gui.add(debugObject, 'createSphere').name(' -----Click Me----- ');
gui.add(debugObject, 'createBox').name(' -----Click Me----- ');
gui
    .add(debugObject, 'reset')
    .name(' Reset Enviorment ')



/**
 * Broadspace
 * 
 * While Collision Cannon js checks if a single body is colliding with each and every other body
 * the above approach is called NaiveBroadspace
 * 
 * GridBroadspace - quadrills the world into grids and check collision in itself grid as well as neighbours grid
 * 
 * SapBroadspace (Sweep And Purne) - test bodies during arbitary axes during multiple steps
 */




/**
 * Animate
*/
const clock = new THREE.Clock();
let oldTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldTime;
    oldTime = elapsedTime;


    // Update the physics world
    // sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position);  // For wind
    objectToUpdate.forEach(({ mesh, body }) => {
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion)
        // body.applyForce(new CANNON.Vec3(-0.5, 0, 0), body.position)
    });
    world.step(1 / 60, deltaTime, 3);


    // sphere.position.x = sphereBody.position.x;
    // sphere.position.y = sphereBody.position.y;
    // sphere.position.z = sphereBody.position.z;
    // sphere.position.copy(sphereBody.position);

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()