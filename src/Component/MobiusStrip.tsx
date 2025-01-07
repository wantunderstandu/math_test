import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Sky } from '@react-three/drei';
import Rotate from '../util/Rotate';

const Modal: React.FC = () => {
  const createSeashellGeometry = () => {
    const geometry = new THREE.BufferGeometry();
    const segments = 200; // u 的分段数
    const tubularSegments = 100; // v 的分段数
    const positions = [];
    const n = 6; // 螺旋的圈数

    for (let i = 0; i <= segments; i++) {
      const u = (i / segments) * Math.PI * 2 * n; // 增加圈数
      for (let j = 0; j <= tubularSegments; j++) {
        const v = (j / tubularSegments) * 2 - 1; // v 范围为 [-1, 1]

        const x = (1 + (v / 2) * Math.cos(u)) * Math.cos(u);
        const y = (1 + (v / 2) * Math.cos(u)) * Math.sin(u);
        const z = (v / 2) * Math.sin(u);

        positions.push(x, y, z);
      }
    }

    const positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
    geometry.setAttribute('position', positionAttribute);

    // 设置顶点索引
    const indices = [];
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < tubularSegments; j++) {
        const a = i * (tubularSegments + 1) + j;
        const b = a + tubularSegments + 1;
        indices.push(a, b, a + 1);
        indices.push(b, b + 1, a + 1);
      }
    }
    geometry.setIndex(indices);
    geometry.computeVertexNormals(); // 计算法线

    return geometry;
  };

  return (
    <mesh geometry={createSeashellGeometry()} rotation={[45,Rotate(),0]}>
      <meshStandardMaterial color="blue" wireframe={false} />
    </mesh>
  );
};


//莫比乌斯环
const Seashell: React.FC = () => {
  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0.6}
        azimuth={0.25}
      />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <Modal />
      <OrbitControls />
    </Canvas>
  );
};

export default Seashell;
