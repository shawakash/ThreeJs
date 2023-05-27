import { OrbitControls } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber';
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Model from './Model';
import { Suspense } from 'react';
import PlaceHolder from './PlaceHolder';
import Hamburger from './Hamburger';
import { Hamburger_Draco } from './Hamburger-draco';

export default function Experience() {

    // const { scene } = useThree();

    const others = useControls('Others', {
        nothing: false,
    });


    // model.scene.scale.x = 0.1
    // model.scene.scale.y = 0.1
    // model.scene.scale.z = 0.1
    // scene.add(model.scene)

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        {/* <mesh castShadow position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh> */}

        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <Suspense
            fallback={
                <PlaceHolder position={[0, 1, 0]} scale={ 2 } />
            }
        >
            {/* <Model /> */}
            <Hamburger scale={ 0.35 } />
            {/* <Hamburger_Draco scale={ 0.35 } /> */}
        </Suspense>


    </>
}