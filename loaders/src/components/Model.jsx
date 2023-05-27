import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React from 'react'
import { Suspense } from 'react';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Model = () => {

    const model = useGLTF('./hamburger.glb', true)

    // const model = useLoader(
    //     GLTFLoader,
    //     './hamburger.glb',
    //     (loader) => {
    //         console.log('loaded')
    //         const dracoLoader = new DRACOLoader();
    //         dracoLoader.setDecoderPath('./draco/');
    //         loader.setDRACOLoader(dracoLoader);
    //     }
    // );

    return (
            <primitive object={model.scene} scale={0.35} />
    )
}

export default Model