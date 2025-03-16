/* eslint-disable react/no-known-property */
import React, { useEffect, useState } from "react";
import { OrbitControls, Environment, useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";

function MyElement3D() {
    // GLTF 모델 로드
    const model = useGLTF("/models/model.glb"); // public/models/model.glb에 위치
    const { actions, names } = useAnimations(model.animations, model.scene); // 애니메이션 데이터 가져오기

    // Leva를 사용하여 애니메이션 선택 UI 생성
    const { actionName } = useControls({
        actionName: {
            value: names[0], // 기본 애니메이션 이름 설정
            options: names, // 애니메이션 이름 목록
        },
    });

    // 선택된 애니메이션 실행
    useEffect(() => {
        const action = actions[actionName];
        if (action) {
            action.reset().fadeIn(0.5).play(); // 애니메이션 시작
            return () => {
                action.fadeOut(0.5); // 컴포넌트 언마운트 시 애니메이션 정지
            };
        }
    }, [actionName, actions]);

    const [height, setHeight] = useState(0);

    // 모델 높이 계산
    useEffect(() => {
        let minY = Infinity;
        let maxY = -Infinity;

        model.scene.traverse((item) => {
            if (item.isMesh) {
                item.geometry.computeBoundingBox(); // boundingBox 계산
                const geomBbox = item.geometry.boundingBox;
                if (minY > geomBbox.min.y) minY = geomBbox.min.y;
                if (maxY < geomBbox.max.y) maxY = geomBbox.max.y;
            }
        });

        const h = maxY - minY;
        setHeight(h); // 높이 상태 업데이트
        console.log("Height of the model:", h);
    }, [model.scene]);

    return (
        <>
            <OrbitControls />
            <Environment preset="sunset" />
            <primitive
                scale={5}
                position={[0, -(height / 2) * 5, 0]} // position-y 대신 position 배열 사용
                object={model.scene}
            />
        </>
    );
}

export default MyElement3D;
