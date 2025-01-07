import ModelContainer from "../util/ModelContainer";

function Modal() {
  const segments = 64;
  const vertices = [];
  const indices = [];

  const a = 4; // Semi-major axis
  const b = 2; // Semi-minor axis

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI; // Angle from 0 to π (latitude)
    for (let j = 0; j <= segments; j++) {
      const phi = (j / segments) * 2 * Math.PI; // Angle from 0 to 2π (longitude)

      const x = a * Math.sin(theta) * Math.cos(phi);
      const y = b * Math.cos(theta);
      const z = a * Math.sin(theta) * Math.sin(phi);

      vertices.push(x, y, z);
    }
  }

  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < segments; j++) {
      const first = i * (segments + 1) + j;
      const second = first + segments + 1;

      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={new Float32Array(vertices)}
          count={vertices.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={new Uint16Array(indices)}
          count={indices.length}
        />
      </bufferGeometry>
      <meshStandardMaterial color="blue" />
    </mesh>
  );
} 

//旋转椭球面
export default function RotationalEllipsoid(){

    return (
        <>
            <ModelContainer Modal={Modal()}></ModelContainer>
        </>
    )
}