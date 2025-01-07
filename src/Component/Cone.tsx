import { OrbitControls, Sky } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import ModelContainer from "../util/ModelContainer"

  const Scene=(): JSX.Element=> {
    const fbx = useLoader(FBXLoader, 'Cone.fbx')
    return (
      <>
        <primitive object={fbx} />
      </>  
    )
  }

//圆锥
export default function Cone() {



    return(
        <>
            <ModelContainer Modal={<Scene/>} />
        </>
    )
}