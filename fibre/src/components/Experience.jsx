import React from 'react'
import { DoubleSide } from 'three'


// Args are used to send initial arguments to geometry
// We provide array in props as some propeties in three js required a vector3
// Target a specific axis by appending -x, -y, -z to the property
// Don't provide a string to a number type prop, a bug


const Experience = () => {
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

                    <mesh position-x={4}>
                        <boxGeometry />
                        <meshBasicMaterial color={'mediumpurple'}/>
                    </mesh>

                    <mesh rotation-x={ -Math.PI * 0.45 } position-y={-10}>
                        <planeGeometry args={[ 100, 100, 5, 50, 50, 50 ]}/>
                        <meshBasicMaterial color={'green'} side={DoubleSide}/>
                    </mesh>

                </group>
        </>
    )
}

export default Experience