import { OrbitControls, Text3D, Center, useMatcapTexture} from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
// to implement the animation we need to create a group around the torus to be able to habe access to children
const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

// load matcaps textures with a drei helper: useMatcapTexture
export default function Experience(){

    // const[torusGeometry, setTorusGeometry] = useState();
    // const[material, setMaterial] = useState();

    //first solution code -animation:
    // const torusGroup = useRef();

    //second solution code-animation:
    const toruses = useRef([]);

    const [matcapTexture] = useMatcapTexture('050505_747474_4C4C4C_333333', 256);

    useEffect(()=> {
        matcapTexture.colorSpace = THREE.SRGBColorSpace;
        matcapTexture.needsUpdate = true;

        material.matcap = matcapTexture;
        material.needsUpdate = true;
    },[]);

    //animation torus
    useFrame((state, delta)=>{
          //first solution code -animation:
        // for(const torus of torusGroup.current.children){
        //     torus.rotation.y += delta * 0.2;
        // }
        //second solution code -animation:
             for(const torus of toruses.current){
            torus.rotation.y += delta * 0.2;
        }
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]}/>
        <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture}/> */}

        <Center>
            <Text3D
                 material={material}
                font='./fonts/helvetiker_regular.typeface.json'
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                delafuentej
                {/* <meshMatcapMaterial matcap={matcapTexture}/> */}
            </Text3D>
        </Center>

        {/* first solution code -animation: */}
        {/* <group ref={torusGroup}> */}
        {
            [...Array(100)].map((value, i)=>{
               return <mesh
                        ref={(torus)=> {
                            toruses.current[i] = torus;
                        }}
                        key={i}
                        geometry={torusGeometry}
                         material={material}
                        position={[
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10,
                            (Math.random() - 0.5) * 10
                        ]}
                        scale={ 0.2 + Math.random() * 0.2}
                        rotation={[
                            Math.random() * Math.PI,
                            Math.random() * Math.PI,
                            0
                        ]}
                    />
            })
        }
        {/* </group> */}

      
    </>
};