import { useMemo } from "react";
import * as THREE from 'three';
import ModelContainer from "../util/ModelContainer"; 
import { Canvas } from '@react-three/fiber';

const generateSaddleSurface = (width: number, height: number, uSegments: number, vSegments: number) => {
  const positions = [];
  const indices = [];
  const normals = [];

  for (let i = 0; i <= uSegments; i++) {
    const u = (i / uSegments) * width - width / 2; // u 范围 [-width/2, width/2]

    for (let j = 0; j <= vSegments; j++) {
      const v = (j / vSegments) * height - height / 2; // v 范围 [-height/2, height/2]

      // 马鞍面公式 z = u^2 - v^2
      const z = (u * u - v * v) / 10;

      // 添加顶点坐标
      positions.push(u, v, z);

      // 计算法线（归一化）
      const nx = 2 * u;
      const ny = -2 * v;
      const nz = -1;
      const norm = Math.sqrt(nx * nx + ny * ny + nz * nz);
      normals.push(nx / norm, ny / norm, nz / norm);

      // 添加索引
      if (i < uSegments && j < vSegments) {
        const first = i * (vSegments + 1) + j;
        const second = first + vSegments + 1;

        indices.push(first, second, first + 1);
        indices.push(second, second + 1, first + 1);
      }
    }
  }

  // 创建 BufferGeometry
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);

  return geometry;
};

function Modal() {
  const width = 10; // u 的范围
  const height = 10; // v 的范围
  const uSegments = 50; // u 方向分段数
  const vSegments = 50; // v 方向分段数

  const geometry = useMemo(() => generateSaddleSurface(width, height, uSegments, vSegments), [width, height, uSegments, vSegments]);

  return (
    <mesh geometry={geometry} position={[0, 0, 0]}>
      <meshStandardMaterial color="blue" metalness={0.5} roughness={0.4} wireframe={false} />
    </mesh>
  );
}



//马鞍面
export default function Saddlesurface(){

    return (
        <>
            <ModelContainer Modal={Modal()}></ModelContainer>
        </>
    )
}