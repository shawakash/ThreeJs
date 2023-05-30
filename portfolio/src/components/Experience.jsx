import { Center, ContactShadows, Environment, Float, Html, PresentationControls, useGLTF } from '@react-three/drei'

export default function Experience() {

    const macBook = useGLTF(`https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf`, true);

    return <>

        <Environment
            preset='city'
        >

        </Environment>

        <ContactShadows
            position-y={-1.4}
            opacity={0.4}
            blur={2.4}
            scale={5}
        />


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
                >
                    <Html
                        transform
                        wrapperClass='htmlScreen'
                        distanceFactor={1.17}
                        position={[0, 1.56, -1.4]}
                        rotation-x={-0.256}
                    >   
                        <iframe src='https://static-portfolio-omega.vercel.app/' />
                    </Html>
                </primitive>
            </Float>
        </PresentationControls>

    </>
}