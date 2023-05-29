import { Center, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'

export default function Experience() {

    const { nodes } = useGLTF('./model/portal.glb', true);
    // console.log(nodes);

    const bakedTexture = useTexture('./model/baked.jpg');
    bakedTexture.flipY = false;

    // const { scene }

    return <>

        <Perf position='top-left' />
        <OrbitControls makeDefault />

        {/* Test Cube */}
        {/* <mesh scale={ 1.5 }>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh> */}

        <Center>
            <mesh
                geometry={nodes.baked.geometry}
            >
                <meshBasicMaterial map={bakedTexture} />   {/* map-flipY={false} */}
            </mesh>

            <mesh
                geometry={nodes.poleLightA.geometry}
                position={nodes.poleLightA.position}
            >
                <meshBasicMaterial color={'#ffffe5'}/>
            </mesh>

            <mesh
                geometry={nodes.poleLightB.geometry}
                position={nodes.poleLightB.position}
            >
                <meshBasicMaterial color={'#ffffe5'}/>
            </mesh>
        </Center>

    </>
}