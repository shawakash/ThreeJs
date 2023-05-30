import { Center, Environment, Float, OrbitControls, useGLTF } from '@react-three/drei'

export default function Experience() {

    const macBook = useGLTF(`https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf`, true);


    return <>

        <Environment
            preset='city'
        >

        </Environment>

        <OrbitControls makeDefault />

        <Float rotationIntensity={0.4}>
            <primitive
                object={macBook.scene}
                position-y={-1.2}
            />
        </Float>

    </>
}