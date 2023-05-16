import Experience from "../Experience";
import * as THREE from 'three';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setEnviornmentMap();
        this.setSunlight();
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
        this.enviornmentMap.intesity = 0.4;
        this.enviornmentMap.texture = this.resources.items.enviornmentMapTexture;
        this.enviornmentMap.texture.encoding = THREE.sRGBEncoding;

        this.scene.environment = this.enviornmentMap.texture;
        
    }
}