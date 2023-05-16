import Experience from "../Experience";
import * as THREE from 'three'

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setGeometry();
        this.setTexture();
        this.setMaterial();
        this.setMesh();
    }

    setGeometry() {
        this.geometry = new THREE.CircleGeometry(5, 64)
    }

    setTexture() {
        this.texture = {};
        this.texture.color = this.resources.items.floorColorTextureLoader;
        this.texture.color.encoding = THREE.sRGBEncoding
        this.texture.color.repeat.set(1.5, 1.5)
        this.texture.color.wrapS = THREE.RepeatWrapping
        this.texture.color.wrapT = THREE.RepeatWrapping

        this.texture.normal = this.resources.items.floorNormalTextureLoader;
        this.texture.normal.repeat.set(1.5, 1.5)
        this.texture.normal.wrapS = THREE.RepeatWrapping
        this.texture.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial();
    }

    setMesh() {
        this.mesh = new THREE.Mesh(
            this.geometry,
            this.material
        )
        this.mesh.material.map = this.texture.color;
        this.mesh.material.normalMap = this.texture.normal;
        this.mesh.receiveShadow = true;
        this.mesh.rotation.x = - Math.PI * 0.5
        this.scene.add(this.mesh)
    }


}