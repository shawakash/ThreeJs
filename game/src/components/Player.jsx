import { KeyboardControls } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier'
import React from 'react'

const Player = () => {

    const player = useRef();

    return (<>
            <RigidBody
                ref={player}
                colliders='hull'
                type='dynamic'
                position={[0, 1, 0]}
                restitution={0.3}
                friction={1}
            >
                <mesh
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