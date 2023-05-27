import { Center, Environment, OrbitControls, Text3D, useMatcapTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three'

const dougnutGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const torusMaterial = new THREE.MeshMatcapMaterial();

// Implementing from native make the encoding from react three fiber null so we need to enable it first

export default function Experience() {

    // const matcapTexture = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256).find(value => value.isTexture);
    // const matcapTexture = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256)[0];
    const [textMatcapTexture] = useMatcapTexture('3E2335_D36A1B_8E4A2E_2842A5', 256);
    const [dougnutMatcapTexture] = useMatcapTexture('5E5855_C6C4CD_C89B67_8F8E98', 256);
    
    // const [torusGeometry, setTorusGeometry] = useState();
    // const [torusMaterial, setTorusMaterial] = useState();
    

    const dougnuts = useRef();

    useEffect(() => {

        dougnutMatcapTexture.encoding = THREE.sRGBEncoding;
        dougnutMatcapTexture.needsUpdate = true;

        torusMaterial.matcap = dougnutMatcapTexture;
        torusMaterial.needsUpdate = true;
    }, [])

    useFrame((state, delta) => {


        dougnuts.current.children.map(mesh => {


            mesh.rotation.x += delta * 0.5 ;
            mesh.rotation.y += delta * 0.5 ;
            mesh.rotation.z += delta * 0.5 ;
        })
    })


    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
        <meshMatcapMaterial ref={setTorusMaterial} matcap={dognutMatcapTexture} /> */}

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

        </Center>

        <group ref={dougnuts}>
            {[...Array(200)].map((value, index) =>
                <mesh
                    key={index}
                    geometry={dougnutGeometry}
                    material={torusMaterial}
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
                />
            )}
        </group>







    </>
}