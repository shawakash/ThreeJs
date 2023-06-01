import { KeyboardControls, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier'
import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three';

const Player = () => {

    const player = useRef();
    const playerMesh = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls()

    useFrame((state, delta) => {

        const { forward, backward, leftward, rightward, jump } = getKeys();
        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = 0.6 * delta;
        const torqueStrength = 0.2 * delta;

        if (forward) {
            impulse.z -= impulseStrength;
            torque.x -= torqueStrength;
        }

        if (backward) {
            impulse.z += impulseStrength;
            torque.x += torqueStrength;
        }

        if (leftward) {
            impulse.x -= impulseStrength;
            torque.z += torqueStrength;
        }

        if (rightward) {
            impulse.x += impulseStrength;
            torque.z -= torqueStrength;
        }

        if (jump) {
            // impulse.y += impulseStrength;
            // torque.z -= torqueStrength;
        }

        if (player.current) {
            player.current.applyImpulse(impulse);
            player.current.applyTorqueImpulse(torque);
        }
    })

    useEffect(() => {

        subscribeKeys(
            (state) => state.jump,            // Selector
            
            (value) => {
                if(value) {
                    player.current.applyImpulse({x: 0, y: 0.6, z: 0})
                }
            }
        )

    }, [subscribeKeys])

    return (<>
        <RigidBody
            ref={player}
            colliders='hull'
            type='dynamic'
            position={[0, 1, 0]}
            restitution={0.3}
            friction={1}
            linearDamping={0.2}
            angularDamping={0.2}
        >
            <mesh
                ref={playerMesh}
                castShadow
            >
                <icosahedronGeometry args={[0.3, 1]} />
                <meshStandardMaterial color={'mediumpurple'} flatShading />
            </mesh>
        </RigidBody>
    </>
    )
}

export default Player