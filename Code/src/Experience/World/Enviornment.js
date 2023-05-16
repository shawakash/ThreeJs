import Experience from "../Experience";
import * as THREE from 'three';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setEnviornmentMap();
        this.setSunlight();

        this.debug = this.experience.debug;
        if (this.debug.active) {
            // console.log(this.enviornmentMap)
            this.debugEnv = this.debug.ui.addFolder('Enviornment');
            this.debugEnv
                .add(this.enviornmentMap, 'intensity')
                .min(0)
                .max(4)
                .step(0.0001)
                .name('EnvMap Intensity ')
                .onChange(this.enviornmentMap.updateMaterial);

            this.debugEnv.add(this.sunlight, 'intensity').min(0).max(10).step(0.0001).name('Light Intensity');

            this.debugLightPosition = this.debugEnv.addFolder('Light Position');
            this.debugLightPosition.add(this.sunlight.position, 'x').min(-10).max(10).step(0.0001).name("Light X")
            this.debugLightPosition.add(this.sunlight.position, 'y').min(-10).max(10).step(0.0001).name("Light Y")
            this.debugLightPosition.add(this.sunlight.position, 'z').min(-10).max(10).step(0.0001).name("Light Z")

        }

    }

    setSunlight() {
        this.sunlight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunlight.castShadow = true
        this.sunlight.shadow.camera.far = 15
        this.sunlight.shadow.mapSize.set(1024, 1024)
        this.sunlight.shadow.normalBias = 0.05
        this.sunlight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.sunlight)
    }

    setEnviornmentMap() {
        this.enviornmentMap = {};
        this.enviornmentMap.intensity = 0.4;
        this.enviornmentMap.texture = this.resources.items.enviornmentMapTexture;
        this.enviornmentMap.texture.encoding = THREE.sRGBEncoding;

        this.scene.environment = this.enviornmentMap.texture;

        this.enviornmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap
                    child.material.envMapIntensity = this.enviornmentMap.intensity
                    child.material.needsUpdate = true
                    child.castShadow = true
                    child.receiveShadow = true
                }
            })
        }
        this.enviornmentMap.updateMaterial();


    }


}