import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Experience from "../Experience";
import * as THREE from 'three';
import Environment from "./Enviornment";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        /**
         * Test Mesh
         */
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                // wireframe: true
            })
        );
        // this.scene.add(testMesh)

        // WAIT FOR THE RESOOURCE TO LOAD
        this.resources.on('ready', () => {
            
            // Enviornment
            this.floor = new Floor();
            this.fox = new Fox();
            this.enviornment = new Environment();
        })



        
    }

    update() {
        if(this.fox) {
            this.fox.update();
        }
    }

    // setLoaders() {
    //     this.loaders = new GLTFLoader();
    // }
}