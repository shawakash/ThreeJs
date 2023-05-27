import React from 'react'

const Donuts = (props) => {
    return (
        <mesh { ...props }>
            <torusGeometry args={[1, 0.6, 16, 32]} />
            <meshMatcapMaterial matcap={matcapTexture} />
        </mesh>
    )
}

export default Donuts