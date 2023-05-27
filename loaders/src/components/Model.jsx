import { Clone, useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React from 'react'
import { Suspense } from 'react';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const Model = () => {

    // const model = useGLTF('./hamburger.glb', true)   // Second parameter is for draco to applied or not
    const model = useGLTF('./hamburger-draco.glb', true)      // alternative way of applying draco
    console.log(model)

    //  Use npx gltfjsx model.glb to break the model into several meshs
    // A jsx file will be generated with multiple mesh
    

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
        <>
            <primitive object={model.scene} scale={0.35} />
            {/* <Clone object={model.scene} scale={0.35} />
            <Clone object={model.scene} scale={0.35} position={[6, 0, 6]} />
            <Clone object={model.scene} scale={0.35} position={[-6, 0, -6]} />
            <Clone object={model.scene} scale={0.35} position={[6, 0, -6]} />
            <Clone object={model.scene} scale={0.35} position={[-6, 0, 6]} /> */}

        </>
    )
}

useGLTF.preload('./hamburger.glb');

export default Model