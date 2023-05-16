import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import EventEmitter from "./EventEmitter";

export default class Resource extends EventEmitter {
    constructor(sources) {
        super();

        this.sources = sources;

        //setup
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoader();
        this.startLoading();
    }

    setLoader() {
        this.loaders = {};
        this.gltfLoader = new GLTFLoader();
        this.cubeTextureLoader = new THREE.CubeTextureLoader();
        this.textureLoader = new THREE.TextureLoader();

    }

    startLoading() {
        // LoadEachSource

        this.sources.forEach(source => {
            if (source.type == 'gltfLoader') {
                this.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                        
                    }
                )
            } else if (source.type == 'cubeTextureLoader') {
                const cubeTexture = this.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                );
                cubeTexture.encoding = THREE.sRGBEncoding;

            } else if (source.type == 'textureLoader') {
                const textureLoader = this.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                );
                textureLoader.encoding = THREE.sRGBEncoding
                textureLoader.repeat.set(1.5, 1.5)
                textureLoader.wrapS = THREE.RepeatWrapping
                textureLoader.wrapT = THREE.RepeatWrapping
            }
        });
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file;
        this.loaded ++ ;

        if(this.loaded == this.toLoad) {
            this.trigger('ready');
        }


    }
}