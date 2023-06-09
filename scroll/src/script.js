import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import gsap from 'gsap'


/**
 * Parallax == The ablity to seeing different objects from different point of view
 */

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        material.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
    })

/**
 * Base
*/
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const objectDistance = 4;
const objectDistanceFormHtmlTag = 2;

/**
 * TETXURES
 */

const textureLoaders = new THREE.TextureLoader();
const gradientTexture = textureLoaders.load('textures/gradients/3.jpg');
gradientTexture.magFilter = THREE.NearestFilter;




/**
 * Objects
*/

const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
});

const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
);
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
);
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
);

scene.add(mesh1, mesh2, mesh3);

const sectionMeshes = [mesh1, mesh2, mesh3]

/**
 * To position objects in such a way that it scales as we resize and the distance between them remains proportinal
 * Makes it on the verge of field of view
 * 
 * mesh1.position.y = 2;
 * mesh1.scale.set(0.5, 0.5, 0.5);
 * 
 * mesh2.visible = false;
 * 
 * mesh3.position.y = -2;
 * mesh3.scale.set(0.5, 0.5, 0.5)
*/


mesh1.position.y = -1 * objectDistance * 0;
mesh1.position.x = -1 * objectDistanceFormHtmlTag;

mesh2.position.y = -1 * objectDistance * 1;
mesh2.position.x = 1 * objectDistanceFormHtmlTag;

mesh3.position.y = -1 * objectDistance * 2;
mesh3.position.x = -1 * objectDistanceFormHtmlTag;

/**
 * Particles
 */


const particleGeometry = new THREE.BufferGeometry();
const count = 2000;

const positions = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {

    positions[i * 3 + 0] = (Math.random() - .5) * 30;
    positions[i * 3 + 1] = objectDistance * 0.5 - Math.random() * objectDistance * sectionMeshes.length;
    positions[i * 3 + 2] = (Math.random() - .5) * 30;

}
// for (let i = 0; i < count * 3; i += 3) {

//     positions[i + 0] = (Math.random() - .5) * 30;
//     positions[i + 1] = (Math.random() - .5) * 30;
//     positions[i + 2] = (Math.random() - .5) * 30;

// }

particleGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    size: 0.002,
    sizeAttenuation: true
});

const particles = new THREE.Points(particleGeometry, particlesMaterial);
scene.add(particles)

/**
 * Light
*/

const directionalLight = new THREE.DirectionalLight('#ffffff', 1);
directionalLight.position.set(1, 1, 0);

scene.add(directionalLight);


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
// Field of view is vertical in threeJs
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,   // to make the canvas transparent so that other html content like images are visible
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */

let scrollY = window.scrollY;
let currentSection = 0;
// let rotate

window.addEventListener('scroll', (e) => {
    scrollY = window.scrollY;

    const newSection = Math.floor(scrollY / sizes.height);
    if (newSection != currentSection) {
        currentSection = newSection;
        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3'
            }
        )
    }
})

let cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener('mousemove', (e) => {
    cursor.x = (e.clientX / sizes.width) - 0.5;
    cursor.y = 0.5 - (e.clientY / sizes.height);
})


/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

/**
 * The animation is not relatics , it is rather <mechanical></mechanical>
 */


const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // Camera Scroll
    // ScrollY Has value in pixels but we want the camera to move to object distance only according to the view-port
    // So we first normalize the value according to the view-port then we tell to increase by objectDistance per unit
    // Its a very important concept;
    camera.position.y = -scrollY / sizes.height * objectDistance;

    // To fix the scroll an parallax conjuction we gonna put the camera in a group AND APPLY PARALLAX TO THE GROUP

    const parallaxX = cursor.x * 0.5;
    const parallaxY = cursor.y * 0.5;
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

    // Objects

    sectionMeshes.forEach(object => {
        object.rotation.x += deltaTime * 0.7;
        object.rotation.y += deltaTime * 0.6;
        object.rotation.z += deltaTime * 0.65;
    });

    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()