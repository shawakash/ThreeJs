import { extend, useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { Clock, DoubleSide, Euler, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import CustomObject from './CustomObject';

extend({ OrbitControls });


// extend converts a threejs class to a jsx component

// Args are used to send initial arguments to geometry
// We provide array in props as some propeties in three js required a vector3
// Target a specific axis by appending -x, -y, -z to the property
// Don't provide a string to a number type prop, a bug
// Useframe is used as tick function in three js provided by the  react three fiber

/**
 * 
 * DON'T USE USESTATE TO ANIMATE THING AS IT RERENDERS AND ALL DATA GETS LOST
 * 
 */


const Experience = () => {

    // const three = useThree();
    // console.log(three)
    // three.camera.position.z = 10;

    const { camera, gl, scene } = useThree();


    // add envs, loaders etc here


    const cubeRef = useRef();
    const torusRef = useRef();
    const groupRef = useRef();

    const clock = new Clock;
    // clock.start();

    // State also has a clock inside useFrame

    const tick = useFrame((state, delta, frame) => {

        const elapsedTime = clock.getElapsedTime()  || state.clock.elapsedTime;
        const deltaTime = clock.getDelta();

        // state.camera.position.x = 8 * Math.cos(elapsedTime * Math.PI * 0.25);
        // state.camera.position.z = 8 * Math.sin(elapsedTime * Math.PI * 0.25);

        // state.camera.lookAt(0, 0, 0)

        if (cubeRef.current && torusRef.current) {

            cubeRef.current.rotation.y += delta;
            torusRef.current.rotation.x += delta;
            torusRef.current.rotation.y += delta;
            torusRef.current.rotation.z += delta;

            // groupRef.current.rotation.x += delta;
            // groupRef.current.rotation.y += delta;
            // groupRef.current.rotation.z += delta;


        }

    });

    // tick;    // No need to call the useFrame it is already called by default

    return (
        <>
            <orbitControls args={[camera, gl.domElement]} />

            <directionalLight position={[7, 2, 0]} intensity={2} />
            <ambientLight intensity={1.5} />


            <group ref={groupRef} position={[0, 0, 0]} >
                {/* <mesh rotation-x={ Math.PI * -0.25 } rotation-y={ Math.PI * 0.25 }>
                        <torusGeometry />
                        <meshNormalMaterial />
                    </mesh> */}
                {/* <mesh position={[ 4, 0, 0 ]}  scale={[ 0.5, 0.5, 0.5 ]}> */}
                {/* <mesh position-x={ 4 }  scale={ 0.5 }> */}
                {/* <sphereGeometry args={[ 2, 60, 60 ]}/> */}
                {/* <meshBasicMaterial args={[{ color: 'red', wireframe: true }]}/>   */}
                {/* <meshBasicMaterial color='cyan' wireframe={ true }/> */}
                {/* </mesh> */}
                {/* <mesh position={[8, 0, 0]} rotation-y={0.1}>
                        <torusKnotGeometry />
                        <meshNormalMaterial />
                    </mesh> */}


                <mesh position-x={-4}>
                    <sphereGeometry />
                    <meshStandardMaterial metalness={0.8} roughness={0.6} color={'orange'} />
                </mesh>

                <mesh ref={cubeRef} position-x={4} scale={2}>
                    <boxGeometry args={[1, 1, 1, 5, 5, 5]} />
                    <meshNormalMaterial wireframe />
                </mesh>


                <mesh ref={torusRef}>
                    <torusGeometry />
                    <meshNormalMaterial wireframe />
                </mesh>

            </group>

            <mesh rotation-x={-Math.PI * 0.5} position-y={-10} scale-x={600} scale-y={600}>
                <planeGeometry args={[1, 1, 5, 50, 50, 50]} />
                <meshNormalMaterial side={DoubleSide} />
            </mesh>

            <CustomObject />

        </>
    )
}

export default Experience