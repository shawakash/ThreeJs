import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier'

export default function Experience() {
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <Physics debug>
            <RigidBody colliders='ball'>
                <mesh castShadow position={[0, 6, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            <RigidBody colliders={false} rotation={[Math.PI * 0.5, 0, 0]} position-y={1}>
                <CuboidCollider args={[1.5, 1.5, 0.5]} />
                <CuboidCollider
                    args={[0.25, 1, 0.25]}
                    position={[0, 0, 1]}
                    rotation={[-Math.PI * 0.35, 0, 0]}
                />
                <mesh castShadow>
                    <torusGeometry args={[1, 0.5, 16, 32]} />
                    <meshStandardMaterial color={'mediumpurple'} />
                </mesh>
            </RigidBody>

            <RigidBody>
                <mesh castShadow position={[3, 1, 3]}>
                    <boxGeometry />
                    <meshStandardMaterial color="mediumpurple" />
                </mesh>
                <mesh castShadow position={[3, 2, 1]} scale={[2, 1, 1]}>
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