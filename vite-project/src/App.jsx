
import { Canvas } from '@react-three/fiber'
import MyElement3D from './MyElement3D.jsx'
import './App.css'

function App()
{

  return (
    <>
      <Canvas
          camera={{
              near : 1,
              far :100,
              position:[7,7,0]
          }}
      >
          <MyElement3D/>
      </Canvas>
    </>
  )
}

export default App
