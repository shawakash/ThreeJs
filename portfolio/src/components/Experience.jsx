import { Center, Environment, Float, PresentationControls, useGLTF } from '@react-three/drei'

export default function Experience() {

    const macBook = useGLTF(`https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf`, true);


    return <>

        <Environment
            preset='city'
        >

        </Environment>


        <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >
            <Float rotationIntensity={0.4}>
                <primitive
                    object={macBook.scene}
                    position-y={-1.2}
                />
            </Float>
        </PresentationControls>

    </>
}