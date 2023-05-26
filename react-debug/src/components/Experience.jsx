import { OrbitControls } from '@react-three/drei'
import Sphere from './Sphere'
import Cube from './Cube'

export default function Experience()
{
    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <Sphere positionX={-2}/>
        <Cube scale={1.5}/>

        

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}