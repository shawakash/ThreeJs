import { Select, useAnimations, useGLTF } from '@react-three/drei'
import { useControls } from 'leva';
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

const Fox = (props) => {

    const model = useGLTF('./Fox/glTF/Fox.gltf', true);
    // console.log(model)
    const animations = useAnimations(model.animations, model.scene);
    // console.log(animations)

    const fox = useControls('Fox', {
        animation: {
            options: animations.names,
        }
    })
    


    useEffect(() => {

        const action = animations.actions[fox.animation];
        action.reset().fadeIn(0.5).play();
        

        // window.setTimeout(() => {
        //     animations.actions.Walk.play();
        //     animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1);

        // }, 2000)


        // CleanUp Space
        return () => {
            action.fadeOut(0.5)
        }

    }, [fox.animation])



    return (
        <>
            <primitive object={model.scene} {...props} />
        </>
    )
}

useGLTF.preload('./Fox/glTF/Fox.gltf')

export default Fox