import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'


/**
 * Shaders
 * Main Components of WebGL
 * Programs Written in GLSL
 * Positions each vertices on
 * Tells the GPU to color each pixels
 * No, we don't call pixel,  we call fragments
 * Shaders Require data, al lot of data
 * 
 * Two Types
 * 
 * 1) Vertex Shaders   --> Positions each vertices of a geometry
 * 2) Fragment Shaders --> Colors Each Fragment of the renderer
 * 
 * 
 * Vertex Shaders only creates the vertice, the data provided makes it look like geometry
 * The same vertex shaders are used to create multiple vertices, only some data would be different from each vertex
 * Those Data are called """""""""attributes"""""""""
 * 
 * Some Type of data doesn't changes with vertices or fragments, these are called """"""""""""""""""""""""Uniforms'''''''''''''''''
 * 
 * Once the gpu knows that a vertice lies in a region then its the fragment shaders that guides the renderer to color each visible fragments of that geometry
 * It also takes data
 * Fragment Shaders only takes uniform and no attributes
 * Vertice shaders also sends data to fragment shader, those are called varying
 * 
 * Varying are Interpolated between vertices
 * 
 * With Shaders, we can do Post-Proccessing
 * 
 */






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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

const count = geometry.attributes.position.count;
let random = new Float32Array(count);

for(let i=0; i<count; i++) {
    random[i] =  Math.random()  ;
}

// Name is arandom as it is a attribute --> Convection
// For varying use vrandom
// for uniforn use urandom
geometry.setAttribute('arandom', new THREE.Float32BufferAttribute(random, 1))
console.log(geometry)

// Material
// Use Backticks to write code/data in multiline
// This is called template Literial
const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,             
    fragmentShader: testFragmentShader,
    // wireframe: true,
    // transparent: true,

    // Uniforms --> Tweekable Uniforms
    uniforms: {
        uFrequency: { value: 10 }
    }

});


const uniforms = gui.addFolder('Uniforms');

uniforms.add(material.uniforms.uFrequency, 'value').min(0).max(100).step(0.001).name('Frequency');


// Some common properties of MeshMaterial works fine with Raw/ShaderMaterial like wireframe, test, side etc
// but properties like alphamap, map etc doesn't

// Mesh
const mesh = new THREE.Mesh(geometry, material)
// mesh.position/rotation/scale --> This is related to model matrix
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
camera.position.set(0.25, - 0.25, 1)
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()