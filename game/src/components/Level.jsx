import React from 'react'
import {BoxGeometry, MeshStandardMaterial} from 'three'


// Common Geometry
const boxGeometry = new BoxGeometry(1,1,1);

// Materials
const meshStandardMaterial = new MeshStandardMaterial();
// color = [ floor1: 'limegreen', wall: 'slategray', floor2: 'greenyellow', obstacle: 'orangered' ]


{/* Start Block */ }
const BlockStart = ({ position=[0, 0, 0] }) => {

    return (
        <group 
            position={position}
        >
            <mesh
                position-y={-0.1}
                receiveShadow
                geometry={boxGeometry}
                scale={[4, 0.2, 4]}
                material={meshStandardMaterial}
                material-color={'limegreen'}
            />
        </group>
    );
}

const Level = (props) => {
    return (
        <group {...props}>

            {/* Block Start */}
            <BlockStart 
                position={[0, 0, 0]}
            />

        </group>
    )
}

export default Level