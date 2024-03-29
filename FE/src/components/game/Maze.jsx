import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { RepeatWrapping, TextureLoader, SRGBColorSpace } from 'three';
import {
  Cat,
  DoorKnob,
  DodoBird,
  Caterpillar,
  CheshireCat,
  Rose,
  Flamingo,
  CardSoldier,
  HeartQueen,
  Rabbit,
  Finish,
  Start,
} from './Asset.jsx';
import Clues from './Clues.jsx';
import Lifes from './Lifes.jsx';
import { useVisibilityStore } from '../../stores/game/gameStore.jsx';

const MazeModel = () => {
  const { scene } = useGLTF('maze/scene.gltf');
  const textureLoader = new TextureLoader();
  const textures = textureLoader.load('maze/textures/grass-seamless-texture-tileable.jpg');
  textures.colorSpace = SRGBColorSpace;
  const {
    catVisible,
    doorKnobVisible,
    dodoBirdVisible,
    caterpillarVisible,
    cheshireCatVisible,
    roseVisible,
    flamingoVisible,
    cardSoldierVisible,
    heartQueenVisible,
    rabbitVisible,
  } = useVisibilityStore();
  const cluePositions = [
    [-9.3, 0.3, -7.5],
    [4.2, 0.3, -7.5],
    [1, 0.3, -1],
    [6.2, 0.3, -3],
    [-2.7, 0.3, 2],
    [-4.6, 0.3, 1],
    [-7.5, 0.3, 2.6],
    [-9, 0.3, 9],
    [9.3, 0.3, 9.3],
    [6, 0.3, 7.8],
  ];
  const lifePositions = [
    [-6.5, 0.2, -9],
    [-6, 0.2, 3],
    [-4, 0.2, 6],
    [-1.3, 0.2, 1],
    [9, 0.2, 2.8],
    [3, 0.2, 8],
  ];
  const [randomCluePositions, setRandomCluePositions] = useState([]);
  const [randomLifePositions, setrandomLifePositions] = useState([]);
  // cluePosition에 10가지 좌표를 넣어놓고 랜덤을 돌려서 5개를 뽑은 다음에 해당 5개를 map을 이용해서 rendering하는 것

  // 처음 한번만 실행
  useEffect(() => {
    // 배열을 복제하여 무작위로 섞음
    const shuffledCluePositions = [...cluePositions].sort(() => Math.random() - 0.5);
    const shuffledLifePositions = [...lifePositions].sort(() => Math.random() - 0.5);
    // 첫 번째부터 다섯 번째까지의 위치를 선택
    const selectedCluePositions = shuffledCluePositions.slice(0, 5);
    const selectedLifePositions = shuffledLifePositions.slice(0, 3);

    setRandomCluePositions(selectedCluePositions);
    setrandomLifePositions(selectedLifePositions);
  }, []);

  useEffect(() => {
    textures.repeat.set(8, 8);
    textures.wrapS = RepeatWrapping; // 텍스처가 가로 방향으로 반복되도록 설정합니다.
    textures.wrapT = RepeatWrapping; // 텍스처가 세로 방향으로 반복되도록 설정합니다.

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.material.name === 'walls' || child.material.name === 'ground') {
          const { material } = child;
          material.map = textures;
          material.needsUpdate = true;
        }
      }
    });
  }, [scene, textures]);

  return (
    <>
      <RigidBody colliders="trimesh">
        <primitive object={scene} />
      </RigidBody>
      {catVisible && <Cat />}
      {doorKnobVisible && <DoorKnob />}
      {dodoBirdVisible && <DodoBird />}
      {caterpillarVisible && <Caterpillar />}
      {cheshireCatVisible && <CheshireCat />}
      {roseVisible && <Rose />}
      {flamingoVisible && <Flamingo />}
      {cardSoldierVisible && <CardSoldier />}
      {heartQueenVisible && <HeartQueen />}
      {rabbitVisible && <Rabbit />}
      <Finish />
      <Start />
      <Clues cluePositions={randomCluePositions} />
      <Lifes lifePositions={randomLifePositions} />
    </>
  );
};

export const Floor = () => {
  return (
    <RigidBody type="static">
      <CuboidCollider args={[100, 0, 100]}>
        <mesh position={[0, 0, 0]} receiveShadow>
          <boxGeometry args={[100, 0, 100]} />
          <meshStandardMaterial color={'lightgray'} />
        </mesh>
      </CuboidCollider>
    </RigidBody>
  );
};

export default MazeModel;
