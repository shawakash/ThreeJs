import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// const AxesHelper = new THREE.AxesHelper(5);
// scene.add(AxesHelper)


/**
 * Textures
*/
const textureLoader = new THREE.TextureLoader()
const matCapTexture = textureLoader.load('textures/matcaps/8.png');
const mat2CapTexture = textureLoader.load('textures/matcaps/3.png');


/**
 * Fonts
 */

const fontLoader = new FontLoader()   // requies a manager
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Muy Feliz! :)',
            {
                font,
                size: 0.5,
                height: 0.2,
                curveSegments: 102,
                bevelEnabled: true,
                bevelThickness: 0.001,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 10
            }
        );

        // textGeometry.computeBoundingBox();
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     -(textGeometry.boundingBox.max.z - 0.001) * 0.5
        // );

        textGeometry.center()

        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });
        // textMaterial.wireframe = true;
        const text = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(text);

        // Creating Geometry and Material Outside the Loop reduces the rendering time by one- enth
        const dognutGeometry = new THREE.TorusGeometry(0.3, 0.2, 100, 100);
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100);
        const material = new THREE.MeshMatcapMaterial({ matcap: mat2CapTexture })
        console.time('f');

        for (let i = 0; i < 700; i++) {
            const dognut = new THREE.Mesh(
                dognutGeometry,
                material
            );
            dognut.position.set(
                (Math.random() * 10 - Math.random() * 10) * 8,
                (Math.random() * 10 - Math.random() * 10) * 8,
                (Math.random() * 10 - Math.random() * 10) * 8
            );

            dognut.rotation.x = Math.PI * Math.random();
            dognut.rotation.y = Math.PI * Math.random();
            dognut.rotation.z = Math.PI * Math.random();

            const cube = new THREE.Mesh(
                cubeGeometry,
                material
            );
            cube.position.set(
                (Math.random() * 10 - Math.random() * 10) * 8,
                (Math.random() * 10 - Math.random() * 10) * 8,
                (Math.random() * 10 - Math.random() * 10) * 8
            )
            cube.rotation.x = Math.PI * Math.random();
            cube.rotation.y = Math.PI * Math.random();
            cube.rotation.z = Math.PI * Math.random();

            scene.add(dognut, cube)
        }
        console.timeEnd('f')
    }
);


/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(cube)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()