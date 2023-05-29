import { useFrame } from '@react-three/fiber'
import { useCursor, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { Color } from 'three'
import Hamburger from './Hamburger'

export default function Experience() {
    const cube = useRef()

    useFrame((state, delta) => {
        cube.current.rotation.y += delta * 0.2
    })

    const eventHandler = (event) => {
        // cube.current.material.color = new Color(Math.random(), Math.random(), Math.random())
        cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
        console.log(event)
    }


    return <>

        <Perf position={'top-left'} />
        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <mesh position-x={- 2} onClick={(e) => {
            e.stopPropagation();
        }}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
            ref={cube}
            position-x={2}
            scale={1.5}
            onClick={eventHandler}
            // onContextMenu={eventHandler}        // Right Click
            // onDoubleClick={eventHandler}
            // onPointerUp={eventHandler}    // When We release The click (left or right)
            // onPointerDown={eventHandler}    // When We clicked (left or right)
            // onPointerOver={eventHandler}    // When the cursor or finger just went above or enter or touched the object
            // onPointerEnter={eventHandler}    // When the cursor or finger just went above or enter or touched the object
            // onPointerMove={eventHandler}    // When the cursor or finger moves over the object
            // onPointerMissed={eventHandler}    // When the cursor or finger misses over the object
            onPointerEnter={ (e) => {
                document.body.style.cursor = 'pointer';   
                // Incase of multiple objects in the webpage get the element from useThree => state => gl => canvas
            }}
            onPointerLeave={(e) => {
                document.body.style.cursor = 'default';
            }}
            
            >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

            <Hamburger />

    </>
}