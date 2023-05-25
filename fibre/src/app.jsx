import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'


const App = () => {

    // To change trivial objects like camera, fov, antialias, encoding etc we do it here in canvas

    return (
        <>
            <Canvas
                // orthographic                   // Just this much to create an orthographic camera
                camera={{
                    fov: 45,
                    // zoom: 100,
                    near: 0.1,
                    far: 200,
                    position: [7, 7, 7],
                }}
            >

                {/* Incase of react three fibre hooks it mainly works inside canvas */}

                <Experience />
            </Canvas>

        </>
    )
}

export default App