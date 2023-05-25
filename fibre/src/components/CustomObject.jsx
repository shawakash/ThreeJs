import React, { useMemo } from 'react'
import { DoubleSide, Float16BufferAttribute } from 'three';

const CustomObject = () => {


    
    const vertexCount = 10 * 3;
    
    const positions = useMemo(() => {
        const positions = new Float32Array(vertexCount * 3);
        
        for(let i=0; i<vertexCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3;
        }

        return positions;

    }, [])

    // <bufferAttribute /> is a alertnative for geometry.attributes and attach is attaching to positions attribute

    return (
        <> 
            <mesh>
                <bufferGeometry>
                    <bufferAttribute 
                        attach={'attributes-position'}
                        count={vertexCount}
                        itemSize={ 3 }
                        array={ positions }
                    />
                </bufferGeometry>
                <meshBasicMaterial side={DoubleSide}/>
            </mesh>
        </>
    )
}

export default CustomObject