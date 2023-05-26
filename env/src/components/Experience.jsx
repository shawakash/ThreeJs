import { useFrame } from '@react-three/fiber'
import { RandomizedLight, AccumulativeShadows, softShadows, useHelper, OrbitControls, BakeShadows } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import { DirectionalLightHelper, Vector2 } from 'three';
import { useEffect } from 'react';


// softShadows({
//     frustum: 3.75,
//     size: 0.005,
//     near: 9.5,
//     samples: 17,
//     rings: 11
// })

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

    // Accumulator shadow, linear combination of shadow maps generated due to the movement of lights
    /**
     *  Eak Plane hai AccumulatorShadow ka jismme ki hum sare shadow ka linear Combination show karte hai jo eak light(inside the tag) ko 
     *  jiggle(randomizing moving on a circle) karne se hoti hai
     */

    return <>


        {/* <BakeShadows /> */}

        <color args={['ivory']} attach={'background'} />

        <Perf position="top-left" />

        <OrbitControls makeDefault />
        <AccumulativeShadows
            position={[0, -0.99, 0]}
            scale={10}
            color='#316d39'       // color of the shadow casting plane 
            opacity={0.8}         
            frames={100}           // Number of shadow renders   // Muy Muy Muy Performent sensitive
            temporal              // to reduce the time taken by the renders to complete
        >

            <RandomizedLight
                amount={8}              // Number of lights to create a shadow map
                radius={1}              // radius of giggle
                ambient={0.5}           // Not clear
                intensity={1}
                position={[1, 2, 3]}
                bias={0.001}            // offset between receiving shadow intensity and casting shadow intensity
                castShadow

            />

        </AccumulativeShadows>

        {/* Lights */}
        <directionalLight
            ref={directionalLight}
            position={[1, 2, 3]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
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

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}