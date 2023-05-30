import { Center, OrbitControls, useGLTF } from '@react-three/drei'

export default function Experience() {

    const macBook = useGLTF(`https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf`, true);


    return <>

        <OrbitControls makeDefault />

        <mesh>
            <boxGeometry />
            <meshNormalMaterial />
        </mesh>

        <Center>
            <primitive object={macBook.scene} />
        </Center>

    </>
}