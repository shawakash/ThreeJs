import React from 'react'
import { Canvas } from '@react-three/fiber'


const App = () => {


    return (
        <>
            {/* <mesh position={[ 2, 2, 2 ]} rotation-x={ 0.5 }>
            <boxGeometry />
            <boxMeshBasicMaterial color='red' />
        </mesh> */}
            {/* <Canvas></Canvas> */}
            <div>app</div>

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