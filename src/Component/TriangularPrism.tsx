import ModalContainer from '../util/ModelContainer'

const Modal=()=> {
    const vertices = new Float32Array([
      // Bottom triangle (x, y, z)
      -1, 0, -1, // Bottom-left
       1, 0, -1, // Bottom-right
       0, 0,  1, // Bottom-center
  
      // Top triangle (x, y, z)
      -1, 2, -1, // Top-left
       1, 2, -1, // Top-right
       0, 2,  1, // Top-center
    ]);
  
    const indices = [
      // Bottom face
      0, 1, 2,
  
      // Top face
      3, 5, 4,
  
      // Side faces
      0, 2, 5,
      5, 3, 0,
      1, 0, 3,
      3, 4, 1,
      2, 1, 4,
      4, 5, 2,
    ];
  
    return (
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={vertices}
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
  

//三棱柱组件
export default function TriangularPrism(){

    return (
        <>
            <ModalContainer Modal={Modal()}></ModalContainer>
        </>
    )
}