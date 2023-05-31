import React, { useRef, useState } from 'react'
import { BoxGeometry, MeshStandardMaterial, Euler, Quaternion } from 'three'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useControls } from 'leva'


// Color Management
THREE.ColorManagement.legacyMode = false;


// Common Geometry
const boxGeometry = new BoxGeometry(1, 1, 1);

// Materials
const floorMaterial1 = new MeshStandardMaterial({ color: 'limegreen' });
const floorMaterial2 = new MeshStandardMaterial({ color: 'greenyellow' });
const obstacleMaterial = new MeshStandardMaterial({ color: 'orangered' });
const wallsMaterial = new MeshStandardMaterial({ color: 'slategray' });
// color = [ floor1: 'limegreen', wall: 'slategray', floor2: 'greenyellow', obstacle: 'orangered' ]


{/* Start Block */ }
const BlockStart = ({ position = [0, 0, 0] }) => {

    return (
        <group
            position={position}
        >
            <mesh
                position-y={-0.1}
                receiveShadow
                geometry={boxGeometry}
                scale={[4, 0.2, 4]}
                material={floorMaterial1}
            />
        </group>
    );
}


{/* End Block */ }
const BlockEnd = ({ position = [0, 0, 0] }) => {

    return (
        <group
            position={position}
        >
            <mesh
                position-y={-0.1}
                receiveShadow
                geometry={boxGeometry}
                scale={[4, 0.2, 4]}
                material={floorMaterial1}
            />
        </group>
    );
}


// Spinner Trap
const SpinnerTrap = ({ position = [0, 0, 0] }) => {

    const obstacle = useRef();

    const { speedMultipler, scale } = useControls('Spinner Obstacle', {

        speedMultipler: {
            value: 0.8,
            min: 0.1,
            max: 5,
            step: 0.001
        },

        scale: {
            value: [3, 0.25, 0.25],
            step: 0.01
        }
    })

    const [randomOffset] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1));

    useFrame((state, delta) => {

        const time = state.clock.getElapsedTime();

        if (obstacle.current) {
            const euler = new Euler(0, time * speedMultipler * randomOffset, 0);
            const quaterion = new Quaternion();
            quaterion.setFromEuler(euler);

            obstacle.current.setNextKinematicRotation(quaterion);

        }

    })

    return (
        <group
            position={position}
        >

            {/* Floor */}
            <mesh
                position-y={-0.1}
                geometry={boxGeometry}
                material={floorMaterial2}
                receiveShadow
                scale={[4, 0.2, 4]}
            />

            {/* Spinner */}
            <RigidBody
                ref={obstacle}
                position={[0, .1, 0]}
                type='kinematicPosition'
                restitution={0.2}
                friction={0}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    receiveShadow
                    castShadow
                    scale={scale}
                >

                </mesh>
            </RigidBody>

        </group>
    );

}



// Limo Trap
const LimboTrap = ({ position = [0, 0, 0] }) => {

    const obstacle = useRef();

    const { speedMultipler, scale } = useControls('Limbo Trap', {

        speedMultipler: {
            value: 0.15,
            min: 0.01,
            max: 5,
            step: 0.001
        },

        scale: {
            value: [3.25, 1.5, 0.25],
            step: 0.01
        }
    })

    const [randomOffset] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1));

    useFrame((state, delta) => {

        const time = state.clock.getElapsedTime();

        if (obstacle.current) {
            const euler = new Euler(0 + position[0], 2 * Math.abs(Math.sin(time * speedMultipler * Math.PI * 2 + randomOffset)) + 0.75 + position[1], 0 + position[2]);

            obstacle.current.setNextKinematicTranslation(euler);  // Takes absolute value

        }

    })

    return (
        <group
            position={position}
        >

            {/* Floor */}
            <mesh
                position-y={-0.1}
                geometry={boxGeometry}
                material={floorMaterial2}
                receiveShadow
                scale={[4, 0.2, 4]}
            />

            {/* Limbo */}
            <RigidBody
                ref={obstacle}
                position={[0, .1, 0]}
                type='kinematicPosition'
                restitution={0.2}
                friction={0}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    receiveShadow
                    castShadow
                    scale={scale}
                >

                </mesh>
            </RigidBody>

        </group>
    );

}



// Axe Trap
const AxeTrap = ({ position = [0, 0, 0] }) => {

    const obstacle = useRef();

    const { speedMultipler, scale } = useControls('Axe Trap', {

        speedMultipler: {
            value: 0.15,
            min: 0.01,
            max: 5,
            step: 0.001
        },

        scale: {
            value: [2.25, 1.5, 0.25],
            step: 0.01
        }
    })

    const [randomOffset] = useState(() => (Math.random() + 0.5) * (Math.random() < 0.5 ? -1 : 1));

    useFrame((state, delta) => {

        const time = state.clock.getElapsedTime();

        if (obstacle.current) {
            const euler = new Euler(
                Math.sin(time * Math.PI * 2 * speedMultipler + randomOffset) * 0.8725 + position[0],
                0.75 + position[1],
                0 + position[2]
            );

            obstacle.current.setNextKinematicTranslation(euler);  // Takes absolute value

        }

    })

    return (
        <group
            position={position}
        >

            {/* Floor */}
            <mesh
                position-y={-0.1}
                geometry={boxGeometry}
                material={floorMaterial2}
                receiveShadow
                scale={[4, 0.2, 4]}
            />

            {/* Limbo */}
            <RigidBody
                ref={obstacle}
                position={[0, .1, 0]}
                type='kinematicPosition'
                restitution={0.2}
                friction={0}
            >
                <mesh
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    receiveShadow
                    castShadow
                    scale={scale}
                >

                </mesh>
            </RigidBody>

        </group>
    );

}



const Level = (props) => {
    return (
        <group {...props}>

            {/* Block Start */}
            <BlockStart
                position={[0, 0, 16]}
            />

            {/* First Trap */}
            <SpinnerTrap position={[0, 0, 12]} />

            {/* Limbo Trap */}
            <LimboTrap position={[0, 0, 8]} />

            {/* Axe Trap */}
            <AxeTrap position={[0, 0, 4]} />

            {/* BlockEnd */}
            <BlockEnd position={[0,0,0]} />

        </group>
    )
}

export default Level