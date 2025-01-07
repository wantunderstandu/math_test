import { useMemo } from "react";
import ModelContainer from "../util/ModelContainer"
import * as THREE from 'three';



const generateEllipsoid = (a: number, b: number, c: number, uSegments: number, vSegments: number) => {
    const positions = [];
    const indices = [];
    const normals = [];
  
    for (let i = 0; i <= uSegments; i++) {
      const u = (i / uSegments) * Math.PI * 2; // 经度 (0 到 2π)
  
      for (let j = 0; j <= vSegments; j++) {
        const v = (j / vSegments) * Math.PI; // 纬度 (0 到 π)
  
        // 计算椭球面上的点
        const x = a * Math.sin(v) * Math.cos(u);
        const y = b * Math.sin(v) * Math.sin(u);
        const z = c * Math.cos(v);
  
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
    const a = 3; // x轴半径
    const b = 2; // y轴半径
    const c = 1; // z轴半径
    const uSegments = 50; // 经度分段数
    const vSegments = 30; // 纬度分段数
  
    const geometry = useMemo(() => generateEllipsoid(a, b, c, uSegments, vSegments), [a, b, c, uSegments, vSegments]);
  
    return (
      <mesh geometry={geometry}>
        <meshStandardMaterial color="blue" wireframe={false} />
      </mesh>
    );
  };

//椭球面
export default function EllipsoidalSurface(){

    return (
        <>
            <ModelContainer Modal={Modal()}></ModelContainer>
        </>
    )
}