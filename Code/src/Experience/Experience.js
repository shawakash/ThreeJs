import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import sources from "./sources";
import Debug from "./utils/Debug";
import Resource from "./utils/Resources";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import * as THREE from 'three';



// singleton
let instance = null;

export default class Experience {
    constructor(canvas) {

        if(instance) {
            return instance;
        }

        instance = this;


        //debug
        this.debug = new Debug();


        // Global Access  --> Through console
        window.experience = this;                // Be carefull

        this.canvas = canvas;
        // console.log('Starting a great Experience, ', this.canvas);


        // scene
        this.scene = new THREE.Scene();
        this.resources = new Resource(sources);


        // World
        this.world = new World();
        
        

        // Setup
        this.sizes = new Sizes();

        this.sizes.on('resize', () => {            // Listner
            // console.log('I heard a resize')
            this.resize()                         // action taker
        })
        // Time
        this.time = new Time();
        
        this.time.on('tick', () => {
            this.update();
        });

        // Camera
        this.camera = new Camera();


        // renderer
        this.renderer = new Renderer();


    }

    update() {
        // update the experience
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    resize() {
        this.camera.resize();         // on resize update the camera;
        this.renderer.resize();  
    }

    destroy() {
        this.sizes.off('resize');
        this.time.off('tick');

        this.scene.traverse(child => {
            if(child instanceof THREE.Mesh) {
                child.geometry.dispose();

                for(const key in child.material) {
                    const value = child.material[key];

                    if(value &&  typeof value.dispose == 'function') {
                        value.dispose();
                    }
                }
            }
        })
    }
}