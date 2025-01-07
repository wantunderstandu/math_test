import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import ModelContainer from '../util/ModelContainer';



const generateConchShell = (
  a: number, b: number, height: number, thickness: number, uSegments: number, vSegments: number, turns: number
) => {
  const positions = [];
  const indices = [];
  const normals = [];

  // 生成海螺形状的顶点数据
  for (let i = 0; i <= uSegments; i++) {
    // 增加theta的范围，确保更多的旋转圈数
    const theta = (i / uSegments) * Math.PI * 2 * turns; // 旋转圈数

    for (let j = 0; j <= vSegments; j++) {
      const v = (j / vSegments) * height - height / 2; // 高度变化

      // 使用对数螺旋公式生成外层和内层的半径
      const rOuter = Math.exp(a + b * theta); // 外层半径
      const rInner = Math.exp(a + b * theta) - thickness; // 内层半径（根据外层半径减去厚度来计算）

      // 外层和内层顶点
      const xOuter = rOuter * Math.cos(theta);
      const yOuter = rOuter * Math.sin(theta);
      const zOuter = v;

      const xInner = rInner * Math.cos(theta);
      const yInner = rInner * Math.sin(theta);
      const zInner = v;

      positions.push(xOuter, yOuter, zOuter); // 外层顶点
      positions.push(xInner, yInner, zInner); // 内层顶点

      // 法线向量（保持与外表面一致的法线方向）
      const normal = new THREE.Vector3(Math.cos(theta), Math.sin(theta), 0); // 法线方向
      normals.push(normal.x, normal.y, normal.z);
      normals.push(-normal.x, -normal.y, -normal.z); // 内层法线方向
    }
  }

  // 生成索引数据以连接顶点形成面
  for (let i = 0; i < uSegments; i++) {
    for (let j = 0; j < vSegments; j++) {
      const current = i * (vSegments + 1) + j;
      const next = current + vSegments + 1;

      const outerCurrent = current * 2;
      const innerCurrent = outerCurrent + 1;
      const outerNext = next * 2;
      const innerNext = outerNext + 1;

      // 外层三角形
      indices.push(outerCurrent, outerNext, outerCurrent + 2);
      indices.push(outerNext, outerNext + 2, outerCurrent + 2);

      // 内层三角形
      indices.push(innerCurrent, innerCurrent + 2, innerNext);
      indices.push(innerNext, innerCurrent + 2, innerNext + 2);

      // 连接外层和内层的侧面
      indices.push(outerCurrent, innerCurrent, innerCurrent + 2);
      indices.push(outerCurrent, innerCurrent + 2, outerCurrent + 2);

      indices.push(outerNext, outerNext + 2, innerNext);
      indices.push(innerNext, outerNext + 2, innerNext + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);

  return geometry;
};

const Modal = () => {
  const a = 0.2; // 对数螺旋的起始半径控制
  const b = 0.05; // 对数螺旋的增长率
  const height = 8; // 海螺的总高度
  const thickness = 0.5; // 海螺的厚度
  const uSegments = 200; // 水平分段数
  const vSegments = 100; // 垂直分段数
  const turns = 6; // 增加绕圈的次数，这里设置为6圈

  const geometry = useMemo(() => generateConchShell(a, b, height, thickness, uSegments, vSegments, turns), [a, b, height, thickness, uSegments, vSegments, turns]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="blue" side={THREE.DoubleSide} />
    </mesh>
  );
};




//海螺面
const Seashell = () => {
  return (
    <ModelContainer Modal={Modal()}></ModelContainer>
  );
};

export default Seashell;
