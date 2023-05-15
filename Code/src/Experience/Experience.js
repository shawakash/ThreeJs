import Camera from "./Camera";
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

        // Global Access  --> Through console
        window.experience = this;                // Be carefull

        this.canvas = canvas;
        // console.log('Starting a great Experience, ', this.canvas);


        // scene
        this.scene = new THREE.Scene();

        // Setup
        this.sizes = new Sizes(this.canvas);

        this.sizes.on('resize', () => {            // Listner
            // console.log('I heard a resize')
            this.resize()                         // action taker
        })

        // Camera
        this.camera = new Camera(this);


        // Time
        this.time = new Time();

        this.time.on('tick', () => {
            this.update();
        });
    }

    update() {
        // update the experience
    }

    resize() {
        // console.log(first)
    }
}