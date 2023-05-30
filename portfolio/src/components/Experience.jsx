import { Center, ContactShadows, Environment, Float, Html, PresentationControls, Text, useGLTF, useProgress } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Loader from './Loader';

const Experience = () => {

    // const progress = useProgress()
    // console.log(progress)

    const macBook = useGLTF(`https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf`, true, (gltf) => { console.log('H') });
    const headPhone = useGLTF(`https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/headphones/model.gltf`, true);

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

        {/* <mesh>
            <planeGeometry args={[2, 2, 1, 1]} />
            <shaderMaterial
                transparent={true}
                vertexShader={`
                    void main() {
                        gl_Position =  vec4(position, 1.0);
                    }
                `}
                fragmentShader={`
                uniform float uAlpha;
        
                void main() {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
                }
                `}
                uniforms={{
                    uAlpha: { value: 1.0 }
                }}
            />
        </mesh> */}


        <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >
            <Float rotationIntensity={0.4}>
                <rectAreaLight
                    width={2.5}
                    height={1.65}
                    intensity={65}
                    color={'#ff6900'}
                    rotation={[0.1, Math.PI, 0]}
                    position={[0, 0.55, -1.15]}
                />

                <Suspense fallback={<Loader />}>

                    <primitive
                        object={macBook.scene}
                        position-y={-1.2}
                        onPointerEnter={(state) => {state.camera.scale.set(2)}}
                        onPointerLeave={(state) => { state.camera.scale.set(2) }}
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

                    <Text
                        font='./bangers-v20-latin-regular.woff'
                        fontSize={1}
                        position={[2, 0.75, 0.75]}
                        rotation-y={-1.25}
                        // children={'AKASH\nSHAW'}
                        maxWidth={2}
                        textAlign='center'
                    >
                        AKASH SHAW
                    </Text>

                    <primitive
                        object={headPhone.scene}
                        scale={0.35}
                        position={[-2.5, -1.2, 0.25]}
                        rotation-x={-Math.PI * 0.43}
                    />
                </Suspense>
            </Float>
        </PresentationControls>



    </>
}

useGLTF.preload(`https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf`, true)
useGLTF.preload(`https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/headphones/model.gltf`, true)

export default Experience