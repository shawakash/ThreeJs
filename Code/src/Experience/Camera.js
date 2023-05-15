import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Experience from "./Experience";
import * as THREE from 'three';

export default class Camera {
    constructor(experience) {

        // One of the solution
        // this.experience = window.experience;   // To access the fov, pixelRatio from sizes via experience we need experience and it has been declared global;
        // console.log(this.experience)

        // From A Parameter    --> A lot heavy
        // this.experience = experience;
        // console.log(experience)

        // Third solution is Singelton 
        /**
         * A variable is created and intanciated at the very begining of the call of experience
         * If the experience is changed again then we don't send the changed one instead we send the old one
         */
        this.experience = new Experience();
        // console.log(this.experience)

        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;


        this.setInstance();
        this.setOrbitControl();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100);
        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance);
    }

    setOrbitControl() {
        this.control = new OrbitControls(this.instance, this.canvas);
        this.control.enableDamping = true;
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        this.control.update();
    }
}