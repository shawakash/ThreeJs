import { OrbitControls } from '@react-three/drei'
import Sphere from './Sphere'
import Cube from './Cube'
import { button, folder, useControls } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience() {

    // leva is added only inside canvas but import outside by Leva component in case of any error

    const { perfVisible } = useControls({
        perfVisible: false,
    })

    const { position, color, visible, wireFrame, scale } = useControls('Sphere', {        

        Mesh: folder({
            scale: {
                value: 1,
                min: 0,
                max: 10,
                step: 0.001,
            },

            position: {
                value: { x: -2, y: 0 },
                min: -10,
                max: 10,
                step: 0.001,
                joystick: 'invertY'
            },
            visible: true,
        }),

        Material: folder({
            color: '#3cc176',                // for alpha hsla don't forget to add alpha or transparent,
            wireFrame: false,
            transparent: false,
            opacity: {
                value: 1,
                min: 0,
                max: 1,
                step: 0.001
            }
        }),


        Others: folder({

            myInterval: {
                min: 0,
                max: 10,
                value: [4, 5]
            },

            Button: button(() => { console.log('Hola') }),

            select: { options: ['1', '2', '3'] }
        }),

    });


    const cubeOption = useControls('Cube', {

        Mesh: folder({
            Scale: {
                value: 2,
                min: 0,
                max: 10,
                step: 0.001,
    
            },
            wireFrame: false,
        }),

        Nested_Folder: folder({
            select: { options: ['1', '2', '3'] }
        })
    })

    return <>

        {perfVisible && <Perf position={'top-left'} />}

        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        {/* <Sphere positionX={-2}/>
        <Cube scale={1.5}/> */}

        <mesh position={[position.x, position.y, 0]} visible={visible} scale={scale}>
            <sphereGeometry />
            <meshStandardMaterial color={color} wireframe={wireFrame} />
        </mesh>

        <mesh position-x={2} scale={cubeOption.Scale} >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" wireframe={cubeOption.wireFrame} />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}