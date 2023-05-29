import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'

export default function Experience()
{

    const { nodes } = useGLTF('./model/portal.glb', true);
    // console.log(nodes);

    const bakedTexture = useTexture('./model/baked.jpg');
    bakedTexture.flipY = false;

    // const { scene }

    return <>

        <OrbitControls makeDefault />

        {/* Test Cube */}
        {/* <mesh scale={ 1.5 }>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh> */}

        <mesh 
            geometry={nodes.baked.geometry}
        >
            <meshBasicMaterial map={bakedTexture} />
        </mesh>

    </>
}