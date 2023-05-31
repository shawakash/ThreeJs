import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { BallCollider, CapsuleCollider, ConeCollider, ConvexHullCollider, CuboidCollider, CylinderCollider, Physics, RigidBody, RoundCuboidCollider, TrimeshCollider } from '@react-three/rapier'
import { Suspense, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Euler, Quaternion } from 'three';

const Experience = () => {

    const cube = useRef();
    const twister = useRef();
    const [hitsound] = useState(() => new Audio('./hit.mp3'))

    const { camera } = useThree();
    camera.position.y = 5;

    const model = useGLTF('./hamburger.glb', true);

    useFrame((state, delta) => {
        const elapsedTime = state.clock.getElapsedTime();
        const euler = new Euler(0, elapsedTime, 0);
        const quaterion = new Quaternion();
        quaterion.setFromEuler(euler);

        if (twister.current) {
            twister.current.setNextKinematicTranslation({
                x: 2 * Math.cos(elapsedTime * Math.PI * 0.25),
                y: -0.8,
                z: 2 * Math.sin(elapsedTime * Math.PI * 0.25)
            })
            twister.current.setNextKinematicRotation(quaterion);
        }
    })

    const collisionEnter = (e) => {
        // console.log('Collision!')
        // hitsound.currentTime = 0;
        // hitsound.volume = Math.random();
        // hitsound.play();
    }

    const collisionExit = () => {
        // console.log('Uff!')
    }

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />

        <Physics debug gravity={[0, -9.81, 0]}>
            <RigidBody colliders={false} gravityScale={1} restitution={0.95} position={[-2, 2, 0]}>
                <BallCollider mass={1} args={[1]} />
                <mesh castShadow>
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
                position={[2, 0, 0]}
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
                onCollisionEnter={collisionEnter}
                onCollisionExit={collisionExit}
            // onSleep={() => console.log('Sleep')}
            // onWake={() => console.log('Wake')}
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
                // type='dynamic'
                position={[0, 4, 0]}
                colliders={false}
            >
                <Suspense fallback={null}>
                    <primitive
                        object={model.scene}
                        scale={0.25}
                    />
                </Suspense>
                {/* <CylinderCollider args={[0.5, 1.25]} /> */}
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

useGLTF.preload('./hamburger.glb', true)

export default Experience