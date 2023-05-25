import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'


const App = () => {


    return (
        <>
            <Canvas>

                {/* Incase of react three fibre hooks it mainly works inside canvas */}

                <Experience />
            </Canvas>

        </>
    )
}

export default App