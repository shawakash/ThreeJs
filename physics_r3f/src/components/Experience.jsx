import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { BallCollider, CapsuleCollider, ConeCollider, CuboidCollider, Physics, RigidBody, RoundCuboidCollider, TrimeshCollider } from '@react-three/rapier'
import { useRef } from 'react';

export default function Experience() {

    const cube = useRef();
    const cubeMesh = useRef();

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <Physics debug gravity={[0, -9.81, 0]}>
            <RigidBody colliders='ball' gravityScale={1}>
                <mesh castShadow position={[-2, 2, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            {/* <RigidBody colliders={'trimesh'} rotation={[Math.PI * 0.5, 0, 0]} position-y={1}>
                {/* <CuboidCollider args={[1.5, 1.5, 0.5]} />
                <CuboidCollider
                    args={[0.25, 1, 0.25]}
                    position={[0, 0, 1]}
                    rotation={[-Math.PI * 0.35, 0, 0]}
                /> */}
            {/* <BallCollider args={[1.5]} /> */}
            {/* <RoundCuboidCollider args={[1,1,1,1]} /> */}
            {/* <CapsuleCollider args={[1,1]} /> */}
            {/* <ConeCollider args={[1,1,1]} /> */}
            {/* <mesh castShadow>
                    <torusGeometry args={[1, 0.5, 16, 32]} />
                    <meshStandardMaterial color={'mediumpurple'} />
                </mesh>
            </RigidBody> */}

            <RigidBody ref={cube} gravityScale={1}>
                <mesh
                    ref={cubeMesh}
                    castShadow
                    position={[1.5, 2, 0]}
                    onClick={(e) => {
                        window.addEventListener('keypress', (ev) => {
                            if (ev.code == 'Space') {
                                // cube.current.applyImpulse({x: 0, y: 7, z: 0})
                                cube.current.applyTorqueImpulse({ x: 0, y: 2, z: 2 })
                                // cube.current.applyImpulseAtPoint({ x: 0, y: 2, z: 0 }, { x: 1, y: 1.5, z: 0.5 })
                            }
                        })
                    }}
                >
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </RigidBody>
            <RigidBody type='fixed'>
                <mesh receiveShadow position-y={- 1.25}>
                    <boxGeometry args={[10, 0.5, 10]} />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>
        </Physics>

    </>
}