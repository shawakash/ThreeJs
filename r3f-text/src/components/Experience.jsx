import { Center, Environment, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react';

export default function Experience() {

    // const matcapTexture = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256).find(value => value.isTexture);
    // const matcapTexture = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256)[0];
    const [ matcapTexture ] = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256);
    console.log(matcapTexture)

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
                <meshMatcapMaterial matcap={ matcapTexture } />
            </Text3D>

            <Suspense
                // fallback={}
            >
                
            </Suspense>

        </Center>



    </>
}