import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import { Leva } from 'leva'
import { KeyboardControls } from '@react-three/drei'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(<>
    <Leva />
    <KeyboardControls

    // KeyW is the second key of first row irrespective of QWERTY ASERTY etc
        map={[
            { name: 'forward', keys: ['ArrowUp', 'W'] },
            { name: 'backward', keys: ['ArrowDown', 'S'] },
            { name: 'leftward', keys: ['ArrowLeft', 'A'] },
            { name: 'rightward', keys: ['ArrowRight', 'D'] },
            { name: 'jump', keys: ['Space'] }
        ]}
    >

        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [2.5, 4, 6]
            }}
        >
            <Experience />
        </Canvas>
    </KeyboardControls>
</>
)