import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Perf } from 'r3f-perf'
import { useControls } from 'leva'
import Level from './Level.jsx'
import { Physics } from '@react-three/rapier'
import Player from './Player.jsx'

const Experience = () => {

    const others = useControls('Others', {
        perf: true
    });

    return <>

        {others.perf && <Perf position='top-left' />}

        <OrbitControls makeDefault />

        <Physics debug>

            <Lights />

            <Level />

            <Player />
            
        </Physics>

    </>
}

export default Experience