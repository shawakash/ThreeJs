import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, SSR, Vignette } from '@react-three/postprocessing'
import { GlitchMode, BlendFunction } from 'postprocessing'

export default function Experience() {
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

            <SSR />
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
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}