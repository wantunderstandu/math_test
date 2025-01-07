import { useMemo } from 'react';
import * as THREE from 'three';
import ModelContainer from '../util/ModelContainer';

const generateHyperboloid = (a: number, b: number, c: number, uSegments: number, vSegments: number) => {
    const positions = [];
    const indices = [];
    const normals = [];
  
    for (let i = 0; i <= uSegments; i++) {
      const u = (i / uSegments) * Math.PI * 2; // 经度 (0 到 2π)
  
      for (let j = 0; j <= vSegments; j++) {
        const v = (j / vSegments) * 2 - 1; // 纬度 (-1 到 1)
  
        // 计算单页双曲面上的点
        const x = a * Math.cosh(v) * Math.cos(u);
        const y = b * Math.cosh(v) * Math.sin(u);
        const z = c * Math.sinh(v);
  
        // 添加点到 positions 数组
        positions.push(x, y, z);
  
        // 计算法线（单位化的顶点位置）
        const norm = Math.sqrt(x * x + y * y + z * z);
        normals.push(x / norm, y / norm, z / norm);
  
        // 生成索引以构建三角形面
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
  
  const Modal = () => {
    const a = 6; // x轴参数
    const b = 6; // y轴参数
    const c = 2; // z轴参数
    const uSegments = 100; // 经度分段数
    const vSegments = 60; // 纬度分段数
  
    const geometry = useMemo(() => generateHyperboloid(a, b, c, uSegments, vSegments), [a, b, c, uSegments, vSegments]);
  
    return (
      <mesh geometry={geometry}>
        <meshStandardMaterial color="blue" wireframe={false} />
      </mesh>
    );
  };


//单页双曲面
export default function Hyperboloidofonesheet(){

    return (
        <>
            <ModelContainer Modal={Modal()}></ModelContainer>
        </>
    )
}