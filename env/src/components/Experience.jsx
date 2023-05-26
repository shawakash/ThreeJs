import { useFrame } from '@react-three/fiber'
import { Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, softShadows, useHelper, OrbitControls, BakeShadows } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import { DirectionalLight, DirectionalLightHelper, DoubleSide, Vector2 } from 'three';
import { useControls, folder } from 'leva'
import { useEffect } from 'react';


// softShadows({
//     frustum: 3.75,
//     size: 0.005,
//     near: 9.5,
//     samples: 17,
//     rings: 11
// })

export default function Experience() {
    const cube = useRef();
    const directionalLight = useRef();


    useEffect(() => {

        // directionalLight.current.shadow.mapSize = new Vector2(1024, 1024)
        // console.log(directionalLight.current.shadow.map)

    }, [])


    // useHelper(directionalLight, DirectionalLightHelper, 1, 'mediumpurple');

    useFrame((state, delta) => {

        const elaspsedTime = state.clock.getElapsedTime();

        cube.current.rotation.y += delta * 0.2;

        
        // if(state.scene.children.find((value) => value.type == 'DirectionalLight').position.y < -1) {
        if(directionalLight.current.position.y < -1  && directionalLight.current.intensity > 0) {
            directionalLight.current.intensity += 0.001 * directionalLight.current.position.y;
        } 
        if(directionalLight.current.position.y > -1 && directionalLight.current.intensity < 1.5) {
            directionalLight.current.intensity += 0.001 * directionalLight.current.position.y;
        }

        // cube.current.position.x = Math.sin(elaspsedTime)

    })

    const controls = useControls('Controls', {
        ContactShadows: folder({
            color: '#316d39',
            opacity: {
                value: 1,
                min: 0,
                max: 1,
                step: 0.001
            },
            blur: {
                value: 6,
                min: 0,
                max: 10,
                step: 0.001
            },
            resolution: {
                value: 128,
                min: 128,
                max: 2048,
                step: 0.001
            },
            far: {
                value: 5,
                min: 0,
                max: 20,
                step: 0.001
            },
        }),

        Perf: folder({
            perfVisible: true,
        }),

        Background: folder({
            bg_color: '#468186'
        }),

        Sky: folder({
            sunPos: {
                value: [1,-0.11,3],
                step: 0.01
            }
        }),

        Enviornment: folder({
            envMapIntensity: {
                value: 3.5,
                min: 0,
                max: 12,
                step: 0.001
            }
        })
    })


    // Accumulator shadow, linear combination of shadow maps generated due to the movement of lights
    /**
     *  Eak Plane hai AccumulatorShadow ka jismme ki hum sare shadow ka linear Combination show karte hai jo eak light(inside the tag) ko 
     *  jiggle(randomizing moving on a circle) karne se hoti hai
     */

    /**
     * Contact Shadow --> doesn't require light to create shadows and make the shadow properties off while working on it
     * and only on plane
     */

    return <>


        {/* <BakeShadows /> */}

        <color args={[controls.bg_color]} attach={'background'} />

        {controls.perfVisible && <Perf position="top-left" />}

    {/** Some hdrs from poly heaven can be directly loaded using preset 
     * To add some thing in environment map just open the auto close tag 
     * and create some mesh in it and it would contribute to whole scene
    */}

        <Environment 
            background             // Just This much to add a enviornment map to the background
            files={ './environmentMaps/sea.hdr' }           // for hdr env
            // files={[
            //     './environmentMaps/1/px.jpg',
            //     './environmentMaps/1/nx.jpg',
            //     './environmentMaps/1/py.jpg',
            //     './environmentMaps/1/ny.jpg',
            //     './environmentMaps/1/pz.jpg',
            //     './environmentMaps/1/nz.jpg',
            // ]}
            // preset=''
        >

            <mesh position-z={5} scale={10}>
                <planeGeometry />
                <meshBasicMaterial color={'cyan'} side={DoubleSide}/>
            </mesh>

        </Environment>

        <OrbitControls makeDefault />
        {/*<AccumulativeShadows
            position={[0, -0.99, 0]}
            scale={10}
            color='#316d39'       // color of the shadow casting plane 
            opacity={0.8}         
            frames={100}           // Number of shadow renders   // Muy Muy Muy Performent sensitive  // Make it infinity for animated object
            temporal              // to reduce the time taken by the renders to complete
            // blend={100}           // Not good for performance
        >

            <RandomizedLight
                amount={8}              // Number of lights to create a shadow map
                radius={1}              // radius of giggle
                ambient={0.5}           // Not clear
                intensity={1}
                position={[1, 2, 3]}
                bias={0.001}            // offset between receiving shadow intensity and casting shadow intensity
                castShadow

            />

        </AccumulativeShadows> */}

        <ContactShadows
            position={[0, -0.99, 0]}
            resolution={controls.resolution}
            far={controls.far}
            color={controls.color}
            opacity={controls.opacity}
            blur={controls.blur}
            // frames={1}                     // to bake the shadows
        />

        {/* Lights */}
        <directionalLight
            ref={directionalLight}
            position={controls.sunPos}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={10}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
            visible = {false}
        />

        <ambientLight intensity={0.5} visible={false}/>

        <Sky sunPosition={controls.sunPos} visible ={false}/>


        <mesh position-x={- 2} castShadow>
            <sphereGeometry />
            <meshStandardMaterial color="orange"  envMapIntensity={controls.envMapIntensity}/>
        </mesh>

        <mesh ref={cube} position-x={2} scale={1.5} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={controls.envMapIntensity} />
        </mesh>

        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={controls.envMapIntensity} />
        </mesh>

    </>
}