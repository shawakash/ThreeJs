import { useFrame } from '@react-three/fiber'
import { useHelper, OrbitControls, BakeShadows } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import { DirectionalLightHelper, Vector2 } from 'three';
import { useEffect } from 'react';

export default function Experience() {
    const cube = useRef();
    const directionalLight = useRef();

    useEffect(() => {

        // directionalLight.current.shadow.mapSize = new Vector2(1024, 1024)
        // console.log(directionalLight.current.shadow.map)

    }, [])

    useHelper(directionalLight, DirectionalLightHelper, 1, 'mediumpurple');

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2;

    })


    return <>

        <BakeShadows />

        <color args={['ivory']} attach={'background'} />

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* Lights */}
        <directionalLight
            ref={directionalLight}
            position={[1, 2, 3]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[ 1024, 1024 ]}
        />

        <ambientLight intensity={0.5} />

        <mesh position-x={- 2} castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cube} position-x={2} scale={1.5} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10} receiveShadow>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}