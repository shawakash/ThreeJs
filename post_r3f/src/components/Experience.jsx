import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, SSR, Vignette } from '@react-three/postprocessing'
import { GlitchMode, BlendFunction } from 'postprocessing'
import { useControls } from 'leva'
import Drunk from './Drunk'
import { useEffect, useRef } from 'react'

export default function Experience() {


    // const ssr = useControls({
    //     temporalResolve: true,
    //     STRETCH_MISSED_RAYS: true,
    //     USE_MRT: true,
    //     USE_NORMALMAP: true,
    //     USE_ROUGHNESSMAP: true,
    //     ENABLE_JITTERING: true,
    //     ENABLE_BLUR: true,
    //     temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    //     temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
    //     maxSamples: { value: 0, min: 0, max: 1 },
    //     resolutionScale: { value: 1, min: 0, max: 1 },
    //     blurMix: { value: 0.5, min: 0, max: 1 },
    //     blurKernelSize: { value: 8, min: 0, max: 8 },
    //     blurSharpness: { value: 0.5, min: 0, max: 1 },
    //     rayStep: { value: 0.3, min: 0, max: 1 },
    //     intensity: { value: 1, min: 0, max: 5 },
    //     maxRoughness: { value: 0.1, min: 0, max: 1 },
    //     jitter: { value: 0.7, min: 0, max: 5 },
    //     jitterSpread: { value: 0.45, min: 0, max: 1 },
    //     jitterRough: { value: 0.1, min: 0, max: 1 },
    //     roughnessFadeOut: { value: 1, min: 0, max: 1 },
    //     rayFadeOut: { value: 0, min: 0, max: 1 },
    //     MAX_STEPS: { value: 20, min: 0, max: 20 },
    //     NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
    //     maxDepthDifference: { value: 3, min: 0, max: 10 },
    //     maxDepth: { value: 1, min: 0, max: 1 },
    //     thickness: { value: 10, min: 0, max: 10 },
    //     ior: { value: 1.45, min: 0, max: 2 }
    // })

    const drunkRef = useRef()
    // useEffect(() => {
    //     console.log(drunkRef.current)
    // },[])

    console.log(Object.keys(BlendFunction))


    const drunk = useControls('Drunk Effect', {
        frequency: {
            value: 7,
            min: 1,
            max: 50,
            step: 0.01
        },
        amplitude: {
            value: 0.2,
            min: 0,
            max: 5,
            step: 0.001
        },
        BlendFunction: {
            options: Object.keys(BlendFunction),
        }
    })

    return <>

        {/* In r3f post processing occurs in blending i.e. effects are blended using some principle */}

        <EffectComposer
        // multisampling={0}
        >
            {/* <Vignette
                offset={0.3}
                darkness={0.75}
                blendFunction={BlendFunction.NORMAL}
            /> */}
            {/* <Glitch
                delay={[2, 3]}
                duration={[0.2, 1]}
                strength={[0.2, 0.4]}
                blendFunction={BlendFunction.NORMAL}
                // mode={GlitchMode.CONSTANT_WILD}
            /> */}
            {/* <Noise
                premultiply
                blendFunction={BlendFunction.SOFT_LIGHT}
                opacity={1}
            /> */}
            {/* <Bloom
                mipmapBlur
                intensity={0.5}
                luminanceThreshold={0}
            /> */}
            {/* <DepthOfField 
                focusDistance={0.025}
                focusRange={0.025}
                bokehScale={6}
            /> */}

            {/* <SSR {...ssr} /> */}
            <Drunk 
                ref={drunkRef}
                frequency={drunk.frequency}
                amplitude={drunk.amplitude}
                blendFunction={BlendFunction[drunk.BlendFunction]}
            />
        </EffectComposer>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
        <ambientLight intensity={0.5} />


        <mesh castShadow position-x={- 2}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={2} scale={1.5} >
            <boxGeometry />
            {/* Emissive works only on Standard material */}
            {/* <meshStandardMaterial color={"white"} emissive={"orange"} emissiveIntensity={ 2 } toneMapped={ false } /> */}
            <meshStandardMaterial color={'mediumpurple'} />
        </mesh>

        <mesh receiveShadow position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial
                color="mediumgreen"
                // metalness={0}
                // roughness={0}
            />
        </mesh>

    </>
}