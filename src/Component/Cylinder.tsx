import { Environment, OrbitControls, Sky } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Rotate from '../util/Rotate'
import ModelContainer from '../util/ModelContainer'

const Scene=(): JSX.Element=> {
    const fbx = useLoader(FBXLoader, 'Cylinder.fbx')
    return (
      <>
        <primitive object={fbx} />
      </>  
    )
  }


  //圆柱
export default function Cylinder(){

    return (
        <>
            <ModelContainer Modal={<Scene/>}></ModelContainer>
        </>
    )
}