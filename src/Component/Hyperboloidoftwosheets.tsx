import { useMemo } from 'react';
import * as THREE from 'three';
import ModelContainer from '../util/ModelContainer';


const generateSolidHypSurface = (
  a: number, b: number, thickness: number, uSegments: number, vSegments: number
) => {
  const positions = [];
  const indices = [];
  const normals = [];

  for (let i = 0; i <= uSegments; i++) {
    const u = (i / uSegments) * Math.PI * 2;

    for (let j = 0; j <= vSegments; j++) {
      const v = (j / vSegments) * 2 - 1;

      const coshV = Math.cosh(v);
      const sinhV = Math.sinh(v);
      const cosU = Math.cos(u);
      const sinU = Math.sin(u);

      // Outer surface
      const xOuter = (a + thickness) * coshV * cosU;
      const yOuter = (a + thickness) * coshV * sinU;
      const zOuter = (b + thickness) * sinhV;

      // Inner surface
      const xInner = (a - thickness) * coshV * cosU;
      const yInner = (a - thickness) * coshV * sinU;
      const zInner = (b - thickness) * sinhV;

      positions.push(xOuter, yOuter, zOuter); // Outer
      positions.push(xInner, yInner, zInner); // Inner

      // Normals
      normals.push(cosU * coshV, sinU * coshV, sinhV); // Outer approx normal
      normals.push(-cosU * coshV, -sinU * coshV, -sinhV); // Inner approx normal

      if (i < uSegments && j < vSegments) {
        const current = i * (vSegments + 1) + j;
        const next = current + vSegments + 1;

        const outerCurrent = current * 2;
        const innerCurrent = outerCurrent + 1;
        const outerNext = next * 2;
        const innerNext = outerNext + 1;

        // Outer surface triangles
        indices.push(outerCurrent, outerNext, outerCurrent + 2);
        indices.push(outerNext, outerNext + 2, outerCurrent + 2);

        // Inner surface triangles
        indices.push(innerCurrent, innerCurrent + 2, innerNext);
        indices.push(innerNext, innerCurrent + 2, innerNext + 2);

        // Connect the sides
        indices.push(outerCurrent, innerCurrent, innerCurrent + 2);
        indices.push(outerCurrent, innerCurrent + 2, outerCurrent + 2);

        indices.push(outerNext, outerNext + 2, innerNext);
        indices.push(innerNext, outerNext + 2, innerNext + 2);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setIndex(indices);

  return geometry;
};

const Modal = () => {
  const a = 4;
  const b = 4;
  const thickness = 0.2;
  const uSegments = 180;
  const vSegments = 120;

  const geometry = useMemo(() => generateSolidHypSurface(a, b, thickness, uSegments, vSegments), [a, b, thickness, uSegments, vSegments]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="blue" side={THREE.DoubleSide} />
    </mesh>
  );
};

//双叶双曲面
export default function Hyperboloidoftwosheets(){

    return (
        <>
            <ModelContainer Modal={Modal()}></ModelContainer>
        </>
    )
}