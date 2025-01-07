import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Rotate from "./Rotate";



export default function ModelContainer(props:{Modal:JSX.Element}) {

    return (
        <>  
            <div style={{width: '100%', height: '100%'}}>
                <Canvas camera={{ position:[0,2,10], fov: 75,near:0.1,far:100 }}>
                    <ambientLight intensity={0.5} />
                    <Sky
                        distance={450000}
                        sunPosition={[0, 1, 0]}
                        inclination={0.6}
                        azimuth={0.25}
                    />
                    <directionalLight position={[5, 5, 5]} intensity={7} color="blue"/>
                    <mesh rotation={[0, Rotate(), 0]}>
                        {props.Modal}
                    </mesh>
                    <OrbitControls />
                </Canvas>
            </div>
        </>
    )
}