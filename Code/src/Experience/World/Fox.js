import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Experience from "../Experience";
import * as THREE from 'three'
import Time from "../utils/Time";

export default class Fox {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.resource = this.resources.items.foxMixer;
        this.time = this.experience.time;


        this.setFox();
        this.setAnimation();
    }

    setFox() {
        this.fox = this.resource.scene;
        this.fox.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.fox);

        this.fox.updateMaterial = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true
                }
            })
        }
        this.fox.updateMaterial();
    }

    setAnimation() {
        this.animation = {};
        this.animation.mixer = new THREE.AnimationMixer(this.fox)
        this.animation.action = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.action.play()

        // this.
        // this.updateMaterial();
    }

    update() {
        // console.log('tick')
        // console.log(this.time.deltaTime)
        this.animation.mixer.update(this.time.deltaTime * 0.001)

    }
}