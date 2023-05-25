import React, { useEffect, useMemo, useRef } from 'react'
import { DoubleSide, Float16BufferAttribute } from 'three';

const CustomObject = () => {

    const geometryRef = useRef();

    // if(geometryRef.current) {
    //     // computeVertexNormal - computes the normal
    //     geometryRef.current.computeVertexNormals();
    // }
    
    const vertexCount = 10 * 3;
    
    const positions = useMemo(() => {
        const positions = new Float32Array(vertexCount * 3);
        
        for(let i=0; i<vertexCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 3;
        }

        return positions;

    }, [])

    // <bufferAttribute /> is a alertnative for geometry.attributes and attach is attaching to positions attribute
    // Initial the mesh won't respond to the light as normals of the geometries are missing and we can do math and create a new normal attribute
    // but we will tell three js to do that

    useEffect(() => {
        geometryRef.current.computeVertexNormals();
    }, [])

    return (
        <> 
            <mesh>
                <bufferGeometry ref={geometryRef}>
                    <bufferAttribute 
                        attach={'attributes-position'}
                        count={vertexCount}
                        itemSize={ 3 }
                        array={ positions }
                    />
                </bufferGeometry>
                <meshStandardMaterial side={DoubleSide} color={'mediumpurple'}/>
            </mesh>
        </>
    )
}

export default CustomObject