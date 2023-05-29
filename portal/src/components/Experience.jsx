import { Center, OrbitControls, Sparkles, shaderMaterial, useGLTF, useTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Color, DoubleSide } from 'three';
import portalVextexShader from '../shaders/portal/vertex.js'
import portalFragmentShader from '../shaders/portal/fragment.js'
import { extend } from '@react-three/fiber';

export default function Experience() {

    const { nodes } = useGLTF('./model/portal.glb', true);
    // console.log(nodes);

    const bakedTexture = useTexture('./model/baked.jpg');
    bakedTexture.flipY = false;

    const PortalMaterial = shaderMaterial(
        {
            uTime: 0,
            uColorStart: new Color('#ffffff'),
            uColorEnd: new Color("#000000"),
        },
        portalVextexShader,
        portalFragmentShader
    );

    extend({PortalMaterial})

    return <>

        <Perf position='top-left' />
        <OrbitControls makeDefault />

        {/* Test Cube */}
        {/* <mesh scale={ 1.5 }>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh> */}

        <Center>

            {/* Basic Structure */}
            <mesh
                geometry={nodes.baked.geometry}
            >
                <meshBasicMaterial map={bakedTexture} />   {/* map-flipY={false} */}
            </mesh>

            {/* Pole Lights */}
            <mesh
                geometry={nodes.poleLightA.geometry}
                position={nodes.poleLightA.position}
            >
                <meshBasicMaterial color={'#ffffe5'} />
            </mesh>

            <mesh
                geometry={nodes.poleLightB.geometry}
                position={nodes.poleLightB.position}
            >
                <meshBasicMaterial color={'#ffffe5'} />
            </mesh>

            {/* Portal */}

            <mesh
                geometry={nodes.portalLight.geometry}
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
            >
                <portalMaterial />
            </mesh>

            {/* SPARKLES */}
            <Sparkles
                position={[0, 1, 0]}
                size={6}
                scale={[4, 2, 4]}
                speed={0.2}
                count={40}
            />

        </Center>

    </>
}