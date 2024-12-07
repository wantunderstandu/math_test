import { Environment, OrbitControls, Sky } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


function Scene() {
    const fbx = useLoader(FBXLoader, 'Cylinder.fbx')
    return <primitive object={fbx} />
  }

export default function Cylinder(){

    return (
        <>
            <div style={{width: '100%', height: '100%'}}>
                <Canvas camera={{position:[0,2,20], fov: 75,near:0.1,far:100}}>
                    <Sky
                        distance={450000}
                        sunPosition={[0, 1, 0]}
                        inclination={0.6}
                        azimuth={0.25}
                    />
                    <Scene />
                    <OrbitControls />
                    <directionalLight intensity={10} position={[2, 2, 5]} color="blue" />
                </Canvas>
            </div>
        </>
    )
}