import React from 'react'

const PlaceHolder = (props) => {

    return (
        <mesh { ...props } >
            <sphereGeometry args={[1]}/>
            <meshBasicMaterial  wireframe color='red' />
        </mesh>
    )
}

export default PlaceHolder