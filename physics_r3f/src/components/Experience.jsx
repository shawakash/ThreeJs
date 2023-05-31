import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Physics, RigidBody } from '@react-three/rapier'

export default function Experience() {
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <Physics>
            <RigidBody colliders='ball'>
                <mesh castShadow position={[0, 6, 0]}>
                    <sphereGeometry />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </RigidBody>

            <RigidBody type='dynamic' colliders='trimesh'>
                <mesh rotation={[-Math.PI * 0.5, 0.1, 0]} position-y={1.75}>
                    <torusGeometry args={[1.2, 0.5, 16, 32]} />
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