import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { BallCollider, CapsuleCollider, ConeCollider, CuboidCollider, Physics, RigidBody, RoundCuboidCollider, TrimeshCollider } from '@react-three/rapier'
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Euler, Quaternion } from 'three';

export default function Experience() {

    const cube = useRef();

    const twister = useRef();

    useFrame((state, delta) => {
        const elapsedTime = state.clock.getElapsedTime();
        const euler = new Euler(0, elapsedTime, 0);
        const quaterion = new Quaternion();
        quaterion.setFromEuler(euler);

        twister.current.setNextKinematicRotation(quaterion);
        twister.current.setNextKinematicTranslation({ x: Math.cos(elapsedTime * Math.PI), y: -0.8, z: Math.sin(elapsedTime * Math.PI) })
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <Physics debug gravity={[0, -9.81, 0]}>
            <RigidBody colliders='ball' gravityScale={1} restitution={0.95}>
                <mesh castShadow position={[-2, 2, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            {/* <RigidBody colliders={'trimesh'} rotation={[Math.PI * 0.5, 0, 0]} position-y={1}> */}
            {/* <CuboidCollider args={[1.5, 1.5, 0.5]} />
                <CuboidCollider
                    args={[0.25, 1, 0.25]}
                    position={[0, 0, 1]}
                    rotation={[-Math.PI * 0.35, 0, 0]}
                />
                <BallCollider args={[1.5]} />
                <RoundCuboidCollider args={[1, 1, 1, 1]} />
                <CapsuleCollider args={[1, 1]} />
                <ConeCollider args={[1, 1, 1]} /> */}
            {/* <mesh castShadow>
                    <torusGeometry args={[1, 0.5, 16, 32]} />
                    <meshStandardMaterial color={'mediumpurple'} />
                </mesh>
            </RigidBody> */}

            <RigidBody
                ref={cube}
                gravityScale={1}
                restitution={0.7}                   // apply the same value of 1 to the floor to have ideal effect
                friction={0.7}
                colliders={false}           // Needed for mass
                position={[4, 0, 0]}
                type='dynamic'
            >
                {/* For mass Custom Coliders are needed */}
                <CuboidCollider args={[0.5, 0.5, 0.5]} mass={1} />
                <mesh
                    castShadow
                    onClick={(e) => {
                        const mass = cube.current.mass();

                        // cube.current.applyImpulse({x: 0, y: 7 * mass, z: 0})
                        cube.current.applyTorqueImpulse({ x: 0, y: 2 * mass, z: 2 * mass })
                        // cube.current.applyImpulseAtPoint({ x: 0, y: 2, z: 0 }, { x: 1, y: 1.5, z: 0.5 })

                    }}
                >
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
            </RigidBody>


            <RigidBody
                ref={twister}
                position={[0, -0.8, 0]}
                friction={0}
                type='kinematicPosition'
            >
                <mesh
                    scale={[0.4, 0.4, 3]}
                    castShadow
                >
                    <boxGeometry />
                    <meshStandardMaterial color="red" />
                </mesh>
            </RigidBody>


            <RigidBody
                type='fixed'
                // restitution={0.7}
                friction={0.7}
            >
                <mesh receiveShadow position-y={- 1.25}>
                    <boxGeometry args={[10, 0.5, 10]} />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody>
        </Physics>

    </>
}