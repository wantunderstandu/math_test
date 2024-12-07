import { CameraShake, Environment, OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function TorusKnotGeometry() {

    const [rotateX, setRotateX]=useState<number>(0);

    useEffect(() => {
        const animate = () => {
            setRotateX(prev => prev + 0.01); // 逐帧增加rotateX的值
            requestAnimationFrame(animate); // 请求下一个动画帧
        };
        animate(); // 开始动画
    }, []);

    return(
        <>
            <div id="canvas-container" style={{ width: "100vw", height: "100vh",position:"relative"}}>
                
                <Canvas camera={{position:[0,2,5], fov: 75,near:0.1,far:100}}>
                    <Sky
                        distance={450000}
                        sunPosition={[0, 1, 0]}
                        inclination={0.6}
                        azimuth={0.25}
                    />
                    <mesh rotation={[0,rotateX,0]}>
                        <torusKnotGeometry args={[1, 0.3, 100, 16]}></torusKnotGeometry>
                        <meshStandardMaterial color={0xffff00} />
                    </mesh>
                    <OrbitControls />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 5]} color="white" />
                </Canvas>
            </div>
        </>
    )
}