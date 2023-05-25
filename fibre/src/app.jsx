import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import { ACESFilmicToneMapping, CineonToneMapping, sRGBEncoding } from 'three'


const App = () => {

    // To change trivial objects like camera, fov, antialias, encoding etc we do it here in canvas

    return (
        <>
            <Canvas
                // dpr={[1,2]} // sets the pixel ratio between this two values
                // orthographic                   // Just this much to create an orthographic camera
                // flat   // -- to remove tone maping  -- default is Acs   // for custom tone mapping use gl
                gl={{
                    antialias: true,   // for antialias
                    toneMapping: ACESFilmicToneMapping,           // Default is ACESFilmicToneMapping
                    outputEncoding: sRGBEncoding                 // Default is sRGBEncoding
                }}

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