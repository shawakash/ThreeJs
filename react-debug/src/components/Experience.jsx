import { OrbitControls } from '@react-three/drei'
import Sphere from './Sphere'
import Cube from './Cube'
import { button, folder, useControls } from 'leva'

export default function Experience() {

    // leva is added only inside canvas but import outside by Leva component in case of any error

    const { position, color, visible } = useControls('Sphere', {
        position: {
            value: { x: -2, y: 0 },
            min: -10,
            max: 10,
            step: 0.001,
            joystick: 'invertY'
        }, 
        color: '#3cc176',                // for alpha hsla don't forget to add alpha or transparent,
        visible: true,

        myInterval: {
            min: 0,
            max: 10,
            value: [4, 5]
        },

        Button : button(() => { console.log('Hola') }),

        select: { options: ['1', '2', '3'] }
    });

    const cubeOption = useControls('Cube', {
        Scale: {
            value: 2,
            min: 0,
            max: 10,
            step: 0.001,
            
        },
        Nested_Folder: folder({
            select: { options: ['1', '2', '3'] }
        })
    })

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        {/* <Sphere positionX={-2}/>
        <Cube scale={1.5}/> */}

        <mesh position={[position.x, position.y, 0]} visible={ visible }>
            <sphereGeometry />
            <meshStandardMaterial color={color} />
        </mesh>

        <mesh position-x={2} scale={cubeOption.Scale} >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}