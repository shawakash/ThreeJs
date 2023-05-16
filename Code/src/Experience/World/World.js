import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Experience from "../Experience";
import * as THREE from 'three';
import Environment from "./Enviornment";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        
        /**
         * Test Mesh
         */
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({
                // wireframe: true
            })
        );
        this.scene.add(testMesh)

        // Enviornment
        this.enviornment = new Environment();
    }

    // setLoaders() {
    //     this.loaders = new GLTFLoader();
    // }
}