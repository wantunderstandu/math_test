import { useEffect, useRef } from "react";
import ModelContainer from "../util/ModelContainer"
import { Vector3 } from "three";
import * as THREE from 'three';

function Modal() {
  const shape = new THREE.Shape();
  const x = -2.5;
  const y = -5;

  // 定义形状路径
  shape.moveTo(x + 2.5, y + 2.5);
  shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
  shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
  shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
  shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
  shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
  shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

  const extrudeSettings = {
    steps: 2,
    depth: 2,
    bevelEnabled: true,
    bevelThickness: 0.5,
    bevelSize: 0.5,
    bevelSegments: 3,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  return (
    <mesh geometry={geometry} position={[0, 0, 0]}>
      <meshStandardMaterial color="blue" metalness={0.5} roughness={0.4} />
    </mesh>
  );
}
  

export default function HeartSurface(){

    return (
        <>
            <ModelContainer Modal={Modal()}></ModelContainer>
        </>
    )
}