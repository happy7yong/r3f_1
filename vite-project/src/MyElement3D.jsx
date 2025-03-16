import { OrbitControls, useGLTF } from "@react-three/drei"

function MyElement3D() {
    const model = useGLTF("./models/model.glb")
    return (
        <>
            <OrbitControls/>

            <primitive object = {model.scene}/>
        </>
    )
}

export default MyElement3D