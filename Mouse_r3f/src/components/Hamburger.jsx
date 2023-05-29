import React from 'react'
import { useGLTF } from '@react-three/drei'

const Hamburger = () => {

    const model = useGLTF('./hamburger.glb');

    const eventHandler = (event) => {
        model.scene.scale.set(0.35, 0.35, 0.35)
        console.log(event.object.name)
        console.log(event.eventObject)             // gets the parent mesh
        event.stopPropagation();
        console.log(event.object.name)
    }

    return (
        <primitive
            object={model.scene}
            scale={0.25}
            position-y={ 0.5 }
            onPointerEnter={() => {document.body.style.cursor = 'pointer'}}
            onPointerLeave={() => {document.body.style.cursor = 'default'}}
            onClick={eventHandler}
        />
    )
}

export default Hamburger