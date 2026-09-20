import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Enable global Three.js caching to drastically speed up asset swapping
THREE.Cache.enabled = true;

export const useAgentModel = (mountRef, agentName) => {
  const sceneRef = useRef(null);
  const mixerRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let animationFrameId;

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    // Moved camera further back to see the full body (especially since model scale is 2.4x)
    camera.position.set(0, 1.0, 6.5);
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight2.position.set(-5, 5, -5);
    scene.add(dirLight2);

    // Load Model
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.target.set(0, 0, 0);

    const loadModel = (name) => {
      if (modelRef.current) {
        scene.remove(modelRef.current);
        modelRef.current = null;
      }
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }

      if (!name) return;

      const modelUrl = `${import.meta.env.BASE_URL}agents_3d/${name.toLowerCase()}_cs.glb`;

      loader.load(
        modelUrl,
        (gltf) => {
          const model = gltf.scene;
          
          const group = new THREE.Group();
          group.add(model);
          
          group.position.set(0, -2.5, 0); // Align with floor
          group.scale.set(2.4, 2.4, 2.4); // Adjust scale
          // group.rotation.y = Math.PI; // Let OrbitControls handle it


          const texBaseDir = `${import.meta.env.BASE_URL}textures_cs/${name.toLowerCase()}`;
          const cb = Date.now();
          
          fetch(`${texBaseDir}/config.json?v=${cb}`)
            .then(res => res.json())
            .then(config => {
              const textureLoader = new THREE.TextureLoader();

              model.traverse((child) => {
                if (child.isMesh) {
                  const mats = Array.isArray(child.material) ? child.material : [child.material];
                  const newMaterials = [];

                  mats.forEach(oldMat => {
                    const matConfig = config.Materials?.find(m => oldMat.name.includes(m.Name) || m.Name.includes(oldMat.name));
                    
                    // Create a completely fresh material to bypass any GLTFLoader shader optimizations
                    const newMat = new THREE.MeshStandardMaterial({
                      name: oldMat.name,
                      color: 0xffffff, // Base color white (texture will act as color)
                      emissive: 0x000000,
                      roughness: 0.8,
                      metalness: 0.2,
                      side: THREE.DoubleSide,
                      transparent: true,
                      alphaTest: 0.1
                    });

                    if (matConfig) {
                      if (matConfig.DF) {
                        const filename = matConfig.DF.split(/[\\/]+/).pop();
                        textureLoader.load(
                          `${texBaseDir}/${filename}?v=${cb}`,
                          (tex) => {
                            tex.colorSpace = THREE.SRGBColorSpace;
                            tex.flipY = false;
                            newMat.map = tex;
                            newMat.needsUpdate = true;
                          }
                        );
                      }
                      if (matConfig.NM) {
                        const filename = matConfig.NM.split(/[\\/]+/).pop();
                        textureLoader.load(
                          `${texBaseDir}/${filename}?v=${cb}`,
                          (tex) => {
                            tex.flipY = false;
                            newMat.normalMap = tex;
                            newMat.needsUpdate = true;
                          }
                        );
                      }
                      /*
                      if (matConfig.EM) {
                        const filename = matConfig.EM.split(/[\\/]+/).pop();
                        textureLoader.load(
                          `${texBaseDir}/${filename}?v=${cb}`,
                          (tex) => {
                            tex.colorSpace = THREE.SRGBColorSpace;
                            tex.flipY = false;
                            newMat.emissiveMap = tex;
                            newMat.emissive = new THREE.Color(0xffffff);
                            newMat.needsUpdate = true;
                          }
                        );
                      }
                      */
                    }
                    
                    newMaterials.push(newMat);
                  });

                  child.material = newMaterials.length === 1 ? newMaterials[0] : newMaterials;

                  // Fix for Veto (Yoru) overlapping models: hide non-default ModelToggle meshes
                  if (config.Variants) {
                    const nonDefaultToggles = config.Variants.filter(v => v.Type === "ModelToggle" && v.Name !== "default");
                    nonDefaultToggles.forEach(variant => {
                       const baseMatchName = variant.Show.split('_Skelmesh')[0];
                       if (child.name.includes(baseMatchName)) {
                         child.visible = false;
                       }
                    });
                  }

                  child.castShadow = true;
                  child.receiveShadow = true;
                }
              });

            })
            .catch(err => {
              console.error("Error loading config for textures:", err);
            });


          scene.add(group);
          modelRef.current = group;

          // Animations
          if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            mixerRef.current = mixer;
            
            // Look for Intro animation to show assets/abilities, fallback to first
            const anim = gltf.animations.find(a => a.name.includes("Select")) || gltf.animations[0];
            
            const action = mixer.clipAction(anim);
            action.play();
          }
        },
        undefined,
        (error) => {
          console.error("Error loading agent model:", error);
        }
      );
    };

    loadModel(agentName);

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      controls.update();

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      const node = mountRef.current;
      if (node && renderer.domElement) {
        node.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mountRef, agentName]);
};
