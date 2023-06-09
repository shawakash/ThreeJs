import { ContactShadows, OrbitControls } from '@react-three/drei'
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
import Fox from './Fox';

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

        {/* By default model created by gltfjsx creates shadow acne so use shadow-normalBias */}

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} shadow-normalBias={ 0.04 } />
        <ambientLight intensity={0.5} />

        {/* <ContactShadows 
            opacity={0.5}
            blur={1.9}
            resolution={128}
            position={[0, -0.99, 0]}
            color={'#316d39'}
        /> */}


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

        <Suspense
            fallback={
                <PlaceHolder position={[-3, 0, 0]} scale={ 1 } />
            }
        >
            <Fox scale={0.02} position={[-3, -0.991, 1.5]}/>
        </Suspense>


    </>
}