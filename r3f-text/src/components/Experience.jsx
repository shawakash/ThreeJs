import { Center, Environment, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react';
import Donuts from './Donuts';

export default function Experience() {

    // const matcapTexture = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256).find(value => value.isTexture);
    // const matcapTexture = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256)[0];
    const [textMatcapTexture] = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256);
    const [dognutMatcapTexture] = useMatcapTexture('5E5855_C6C4CD_C89B67_8F8E98', 256);

    const tempArray = [...Array(100)];

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <Center>
            <Text3D
                font={"./fonts/helvetiker_regular.typeface.json"}
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                Hola
                <meshMatcapMaterial matcap={textMatcapTexture} />
            </Text3D>


            {[...Array(200)].map(() =>
                <mesh
                    position={[
                        (Math.random() - 0.5) * 100,
                        (Math.random() - 0.5) * 100,
                        (Math.random() - 0.5) * 100
                    ]}
                    rotation={[
                        (Math.random() - 0.5) * Math.PI,
                        (Math.random() - 0.5) * Math.PI,
                        (Math.random() - 0.5) * Math.PI
                    ]}
                    scale={Math.random() * 0.6 + 0.3}
                >
                    <torusGeometry args={[1, 0.6, 16, 32]} />
                    <meshMatcapMaterial matcap={dognutMatcapTexture} />
                </mesh>
            )}



        </Center>



    </>
}