import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import { Leva } from 'leva'
import { Color, PCFSoftShadowMap } from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const created = ({ gl, scene }) => {

    /*1*/   // gl.setClearColor('black', 1)
    /*2*/  // scene.background = new Color('black')
    /*3*/ // css
    /*4*/ // attach to color tag and pass color as args={[]}

    // console.log(gl.shadowMap)

}

root.render(<>
    <Leva />
    <Canvas
        shadows={false}
        camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [- 4, 3, 6]
        }}

        onCreated={created}
    >

        <Experience />
    </Canvas>
</>
)