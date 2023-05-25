import React from 'react'

const Experience = () => {
    return (
        <>
            <group position={[-4, 0, 0]}>
                    <mesh>
                        <torusKnotGeometry />
                        <meshNormalMaterial />
                    </mesh>
                    <mesh position={[7, 0, 0]} rotation-y={0.1}>
                        <torusKnotGeometry />
                        <meshNormalMaterial />
                    </mesh>
                </group>
        </>
    )
}

export default Experience