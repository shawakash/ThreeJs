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
        
        this.debug = this.experience.debug;
        
        if(this.debug.active) {
            this.gui = this.debug.ui.addFolder('Fox');
        }

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

        this.debugScale = this.gui.addFolder('Scale');
        this.debugScale.add(this.fox.scale, 'x').min(0).max(2).step(0.00001).name('Scale X');
        this.debugScale.add(this.fox.scale, 'y').min(0).max(2).step(0.00001).name('Scale Y');
        this.debugScale.add(this.fox.scale, 'z').min(0).max(2).step(0.00001).name('Scale Z');

    }

    setAnimation() {
        this.animation = {};
        this.animation.mixer = new THREE.AnimationMixer(this.fox)

        this.animation.action = {};

        this.animation.action.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.action.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.action.running = this.animation.mixer.clipAction(this.resource.animations[2])

        this.animation.action.current = this.animation.action.idle
        this.animation.action.current.play()

        this.animation.play = (name) => {

            const newAction = this.animation.action[name];
            const currentAction = this.animation.action.current;

            newAction.reset();
            newAction.play();

            newAction.crossFadeFrom(currentAction, 1);
            this.animation.action.current = newAction;

        }
        this.animation.play('walking')
        this.debugAni = this.gui.addFolder('Animations');
        this.debugObject = {
            playIdle: () => this.animation.play('idle'),
            playWalking: () => this.animation.play('walking'),
            playRunning: () => this.animation.play('running'),
        }
        this.debugAni.add(this.debugObject, 'playIdle');
        this.debugAni.add(this.debugObject, 'playWalking');
        this.debugAni.add(this.debugObject, 'playRunning');
    }

    update() {
        // console.log('tick')
        // console.log(this.time.deltaTime)
        this.animation.mixer.update(this.time.deltaTime * 0.001)

    }
}