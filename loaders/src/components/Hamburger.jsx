/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.12 ./public/hamburger.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { folder, useControls } from 'leva';
import { useEffect } from 'react';

export default function Hamburger(props) {
  const { nodes, materials } = useGLTF('./hamburger.glb');

  const topBun = useRef();
  const bottomBun = useRef();

  useEffect(() => {
    // console.log('Bottom', bottomBun.current.position)
  }, [])

  const burger = useControls('Hamburger', {
    Bun: folder({
      position: {
        value: { x: 0, y: 1.77 },
        step: 0.01,
        joystick: 'invertY',
      }
    }),


    Meat: folder({
      meatColor: '#4e1c1c'
    }),

    Cheese: folder({
      chesseColor: '#cbc029'
    }),
  });

  return (
    <group {...props} dispose={null} >
      <mesh
        ref={bottomBun}
        position={[-burger.position.x, -(burger.position.y - 1.77), 0]}
        geometry={nodes.bottomBun.geometry}
        material={materials.BunMaterial}
        material-wireframe={burger.topBunWire} 
        receiveShadow
        castShadow
      />
      <mesh
        geometry={nodes.meat.geometry}
        material={materials.SteakMaterial}
        position={[0, 2.82, 0]}
        material-color={burger.meatColor}
        castShadow
      />
      <mesh
        geometry={nodes.cheese.geometry}
        material={materials.CheeseMaterial}
        position={[0, 3.04, 0]}
        material-color={burger.chesseColor}
        receiveShadow
        castShadow
      />
      <mesh
      ref={topBun}
      position={[burger.position.x, burger.position.y, 0]}
        geometry={nodes.topBun.geometry}
        material={materials.BunMaterial}
        
        castShadow
      />
    </group>
  )
}

useGLTF.preload('./hamburger.glb')
