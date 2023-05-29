import React from 'react'
import { useGLTF } from '@react-three/drei'

const Hamburger = () => {

    const model = useGLTF('./hamburger.glb');

    return (
        <primitive object={model.scene} scale={ 0.35 } />
    )
}

export default Hamburger