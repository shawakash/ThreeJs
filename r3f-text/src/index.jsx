import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import Experience from './components/Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
        <Leva />
        <Canvas
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [4, - 2, 6]
            }}
        >
            <Experience />
        </Canvas>
    </>
)