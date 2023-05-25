import React from 'react'


// Args are used to send initial arguments to geometry


const Experience = () => {
    return (
        <>
            <group position={[-4, 0, 0]}>
                    <mesh>
                        <torusKnotGeometry />
                        <meshNormalMaterial />
                    </mesh>
                    <mesh position={[ 4, 0, 0 ]} >
                        <sphereGeometry args={[ 2, 60, 60 ]}/>
                        <meshBasicMaterial />
                    </mesh>
                    <mesh position={[8, 0, 0]} rotation-y={0.1}>
                        <torusKnotGeometry />
                        <meshNormalMaterial />
                    </mesh>
                </group>
        </>
    )
}

export default Experience