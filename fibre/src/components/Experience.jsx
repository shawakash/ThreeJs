import { extend, useFrame, useThree } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { Clock, DoubleSide, Euler, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

    const { camera, gl } = useThree();


    const cubeRef = useRef();
    const torusRef = useRef();
    const groupRef = useRef();
    // const [camera, setCamera] = useState();

    // const clock = new Clock;
    // clock.start();

    const tick = useFrame((state, delta, frame) => {


        // setCamera(state.camera);

        // const elapsedTime = clock.getElapsedTime();
        // const deltaTime = clock.getDelta();

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
            <orbitControls args={[ camera, gl.domElement ]}/>
            
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
                    <meshNormalMaterial wireframe />
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

            <mesh rotation-x={-Math.PI * 0.5} position-y={-10}>
                <planeGeometry args={[100, 100, 5, 50, 50, 50]} />
                <meshNormalMaterial side={DoubleSide}/>
            </mesh>
            
        </>
    )
}

export default Experience