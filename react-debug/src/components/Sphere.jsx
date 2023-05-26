import React from 'react'

const Sphere = ({ positionX = -2 }) => {
    return (
        <mesh position-x={positionX}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}

export default Sphere