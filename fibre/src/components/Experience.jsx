import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Clock, DoubleSide } from 'three'


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

    const cubeRef = useRef();

    const clock = new Clock;
    // clock.start();

    const tick = useFrame(() => {
        
        const elapsedTime = clock.getElapsedTime();

        if(cubeRef.current) {
            
            cubeRef.current.rotation.y = elapsedTime * 0.75;
        }

    });

    // tick;    // No need to call the useFrame it is already called by default

    return (
        <>
            <group position={[0, 0, 0]} >
                    {/* <mesh rotation-x={ Math.PI * -0.25 } rotation-y={ Math.PI * 0.25 }>
                        <torusGeometry />
                        <meshNormalMaterial />
                    </mesh> */}
                    {/* <mesh position={[ 4, 0, 0 ]}  scale={[ 0.5, 0.5, 0.5 ]}> */}
                    {/* <mesh position-x={ 4 }  scale={ 0.5 }> */}
                        {/* <sphereGeometry args={[ 2, 60, 60 ]}/> */}
                        {/* <meshBasicMaterial args={[{ color: 'red', wireframe: true }]}/>   */ } 
                        {/* <meshBasicMaterial color='cyan' wireframe={ true }/> */}
                    {/* </mesh> */}
                    {/* <mesh position={[8, 0, 0]} rotation-y={0.1}>
                        <torusKnotGeometry />
                        <meshNormalMaterial />
                    </mesh> */}


                    <mesh position-x={-4}>
                        <sphereGeometry />
                        <meshBasicMaterial color={'#ff7321'} wireframe/>
                    </mesh>

                    <mesh ref={cubeRef} position-x={4}>
                        <boxGeometry />
                        <meshBasicMaterial color={'mediumpurple'}/>
                    </mesh>

                    <mesh rotation-x={ -Math.PI * 0.5 } position-y={-10}>
                        <planeGeometry args={[ 100, 100, 5, 50, 50, 50 ]}/>
                        <meshBasicMaterial color={'green'} side={DoubleSide}/>
                    </mesh>

                </group>
        </>
    )
}

export default Experience