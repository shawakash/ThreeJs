import React from 'react'
import { meshBounds, useGLTF } from '@react-three/drei'

const Hamburger = () => {

    const model = useGLTF('./hamburger.glb');

    const eventHandler = (event) => {
        // console.log(event.object.name)
        // console.log(event.eventObject)             // gets the parent mesh
        event.stopPropagation();
        // console.log(event.object.name)
    }

    return (
        <primitive
            object={model.scene}
            scale={0.25}
            position-y={0.5}
            onPointerEnter={() => {
                document.body.style.cursor = 'pointer'
            }}
            onPointerLeave={() => {
                document.body.style.cursor = 'default'
                if (model.scene.scale.x == 0.35) {
                    model.scene.scale.set(0.25, 0.25, 0.25)
                }
            }}
            onClick={eventHandler}
            onDoubleClick={() => {
                model.scene.scale.set(0.35, 0.35, 0.35)
            }}
        />
    )
}

export default Hamburger