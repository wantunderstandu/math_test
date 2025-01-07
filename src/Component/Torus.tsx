import { Canvas, useLoader } from "@react-three/fiber"
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader"
import ModelContainer from "../util/ModelContainer"





  const Scene=(): JSX.Element=> {
    const fbx = useLoader(FBXLoader, 'Torus.fbx')
    return (
      <>
        <primitive object={fbx} />
      </>  
    )
  }


  //圆环
export default function Torus() {

    return (
        <>
            <ModelContainer Modal={<Scene />} />
        </>
    )
}