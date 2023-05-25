import React from 'react'
import { Canvas } from '@react-three/fiber'


const App = () => {


    return (
        <>
            <Canvas>
                <mesh>
                    <torusKnotGeometry />
                    <meshNormalMaterial />
                </mesh>
            </Canvas>

        </>
    )
}

export default App