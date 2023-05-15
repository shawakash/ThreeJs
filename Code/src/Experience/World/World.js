import Experience from "../Experience";
import * as THREE from 'three';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        
        /**
         * Test Mesh
         */
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                wireframe: true
            })
        );
        this.scene.add(testMesh)
    }

    setLoaders() {

    }
}