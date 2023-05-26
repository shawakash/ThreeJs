import { OrbitControls } from '@react-three/drei'
import Sphere from './Sphere'
import Cube from './Cube'
import { useControls } from 'leva'

export default function Experience() {

    const controls = useControls({ 
        positionX: {
            value: -2,
            min: -10,
            max: 10,
            step: 0.001,
            
        } 
    });

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        {/* <Sphere positionX={-2}/>
        <Cube scale={1.5}/> */}

        <mesh position-x={ controls.positionX }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}