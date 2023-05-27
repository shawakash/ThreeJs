import { useGLTF } from '@react-three/drei'
import React from 'react'

const Fox = (props) => {

    const model = useGLTF('./Fox/glTF/Fox.gltf', true);
    // console.log(model)
    return (
        <>
            <primitive object={model.scene} {...props} />
        </>
    )
}

useGLTF.preload('./Fox/glTF/Fox.gltf')

export default Fox