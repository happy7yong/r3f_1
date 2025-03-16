/* eslint-disable react/no-known-property */
import React, { useEffect, useState } from "react";
import { OrbitControls, Environment, useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";

function MyElement3D() {
    // GLTF 모델 로드
    const model = useGLTF("/models/model.glb");
    const { actions, names } = useAnimations(model.animations, model.scene);

    const { actionName } = useControls({
        actionName: {
            value: names[0],
            options: names,
        },
    });

    // 선택된 애니메이션 실행
    useEffect(() => {
        const action = actions[actionName];
        if (action) {
            action.reset().fadeIn(0.5).play();
            return () => {
                action.fadeOut(0.5);
            };
        }
    }, [actionName, actions]);

    const [height, setHeight] = useState(0);


    useEffect(() => {
        let minY = Infinity;
        let maxY = -Infinity;

        model.scene.traverse((item) => {
            if (item.isMesh) {
                item.geometry.computeBoundingBox();
                const geomBbox = item.geometry.boundingBox;
                if (minY > geomBbox.min.y) minY = geomBbox.min.y;
                if (maxY < geomBbox.max.y) maxY = geomBbox.max.y;
            }
        });

        const h = maxY - minY;
        setHeight(h);
        console.log("Height of the model:", h);
    }, [model.scene]);

    return (
        <>
            <OrbitControls />
            <Environment preset="sunset" />
            <primitive
                scale={5}
                position={[0, -(height / 2) * 5, 0]} //position-y 대신 position 배열 사용
                object={model.scene}
            />
        </>
    );
}

export default MyElement3D;
