import { useLoader } from '@react-three/fiber';
import React from 'react'
import { Suspense } from 'react';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const FilghtHelmet = () => {

    const model = useLoader(
        GLTFLoader,
        './FlightHelmet/glTF/FlightHelmet.gltf',
        (loader) => {
            console.log('loaded')
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('./draco/');
            loader.setDRACOLoader(dracoLoader);
        }
    );

    return (
            <primitive object={model.scene} scale={5} />
    )
}

export default FilghtHelmet