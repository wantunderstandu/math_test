import { useEffect, useRef, useState } from 'react';
import { BufferGeometry, Float32BufferAttribute, Mesh, Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Reflector, Sky } from '@react-three/drei';
import Rotate from '../util/Rotate';


function Shape() {

  const slices = 25;
  const stacks = 25;

  const klein = (u: number, v: number, target: Vector3) => {
    u *= Math.PI;
    v *= 2 * Math.PI;
    u = u * 2;

    let x, z;

    if (u < Math.PI) {
      x =
        3 * Math.cos(u) * (1 + Math.sin(u)) +
        (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
      z =
        -8 * Math.sin(u) -
        2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
    } else {
      x =
        3 * Math.cos(u) * (1 + Math.sin(u)) +
        (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
      z = -8 * Math.sin(u);
    }

    const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

    target.set(x, y, z).multiplyScalar(0.75);
  };

  // 创建 BufferGeometry
  const geometry = new BufferGeometry();
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const tempVec = new Vector3();

  for (let i = 0; i <= slices; i++) {
    for (let j = 0; j <= stacks; j++) {
      const u = i / slices;
      const v = j / stacks;

      // 获取 Klein 曲面的顶点坐标
      klein(u, v, tempVec);

      positions.push(tempVec.x, tempVec.y, tempVec.z);

      // 法线计算 (可以根据需要更精确地计算法线)
      const normal = tempVec.clone().normalize();
      normals.push(normal.x, normal.y, normal.z);

      // 纹理坐标
      uvs.push(u, v);
    }
  }

  // 创建索引数组，构建每个面的三角形
  for (let i = 0; i < slices; i++) {
    for (let j = 0; j < stacks; j++) {
      const a = i * (stacks + 1) + j;
      const b = (i + 1) * (stacks + 1) + j;
      const c = (i + 1) * (stacks + 1) + (j + 1);
      const d = i * (stacks + 1) + (j + 1);

      // 每个方形面拆分为两个三角形
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  // 设置 BufferGeometry 的属性
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  return (
    <mesh geometry={geometry} rotation={[45,Rotate(),0]}>
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}


//克莱因瓶子
export default function Klein(){

    return(
        <>
            <div id="canvas-container" style={{ width: "100%", height: "100%"}}>
                <Canvas camera={{position:[0,2,20], fov: 75,near:0.1,far:100}}>
                    <Sky
                        distance={450000}
                        sunPosition={[0, 1, 0]}
                        inclination={0.6}
                        azimuth={0.25}
                    />
                    <Shape></Shape>
                    <OrbitControls />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 5]} color="white" />
                </Canvas>
            </div>
        </>
    )
}