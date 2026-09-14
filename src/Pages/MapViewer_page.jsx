import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import MapViewer_bgc from "../assets/pages_bgc/Play_bgc.png"; // Sci-Fi background for loading

// Initialize three-mesh-bvh for ultra-fast CPU raycasting!
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const MapViewer_page = ({ onBack }) => {
  const mountRef = useRef(null);
  const [gameState, setGameState] = useState('LOADING'); // LOADING, CONTROLS, PLAYING
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let controls;

    // ---------------------------------------------------------------
    // 1. Scene setup
    // ---------------------------------------------------------------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    scene.fog = new THREE.Fog(0x87CEEB, 50, 250);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(12.39, 4.7, -22.52);

    // DISABLED Antialiasing: MSAA causes a massive GPU hit by rendering edges at 4x resolution. 
    // Disabling it yields extreme performance gains!
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Hard-cap pixel ratio to 1.0 to massively boost FPS on high-res displays
    renderer.setPixelRatio(1.0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    
    renderer.shadowMap.enabled = true;
    // Standard PCF is much faster than PCFSoft
    renderer.shadowMap.type = THREE.PCFShadowMap;
    
    if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
    }

    // REMOVED PMREMGenerator Environment Map: PBR Environment reflections are incredibly expensive.
    // Relying solely on Hemisphere and Directional lights saves massive shading time!

    // ---------------------------------------------------------------
    // 2. Lights
    // ---------------------------------------------------------------
    const hemiLight = new THREE.HemisphereLight(0xffe5b4, 0x111122, 0.2);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 2.5);
    dirLight.position.set(-80, 150, 80);
    dirLight.castShadow = true;
    // Lowered shadow map to 512x512
    dirLight.shadow.mapSize.width = 512;
    dirLight.shadow.mapSize.height = 512;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 500;
    const shadowSize = 150;
    dirLight.shadow.camera.left = -shadowSize;
    dirLight.shadow.camera.right = shadowSize;
    dirLight.shadow.camera.top = shadowSize;
    dirLight.shadow.camera.bottom = -shadowSize;
    dirLight.shadow.bias = -0.0005; 
    dirLight.shadow.camera.updateProjectionMatrix();
    scene.add(dirLight);

    const dirtGeo = new THREE.PlaneGeometry(2000, 2000);
    dirtGeo.computeBoundsTree(); // BVH for backup floor
    const dirtMat = new THREE.MeshStandardMaterial({ color: 0x5d6842, roughness: 1.0 });
    const dirtPlane = new THREE.Mesh(dirtGeo, dirtMat);
    dirtPlane.rotation.x = -Math.PI / 2;
    dirtPlane.position.y = -5.0;
    scene.add(dirtPlane);

    // ---------------------------------------------------------------
    // 3. PointerLock Controls
    // ---------------------------------------------------------------
    controls = new PointerLockControls(camera, renderer.domElement);
    
    const onLock = () => {
        // UI is instantly hidden in handleStartGame, but this confirms the lock
    };
    const onUnlock = () => {
        setGameState('CONTROLS');
    };
    const onError = () => {
        setGameState('CONTROLS');
    };

    controls.addEventListener('lock', onLock);
    controls.addEventListener('unlock', onUnlock);
    document.addEventListener('pointerlockerror', onError);

    // ---------------------------------------------------------------
    // 4. Movement state & keyboard listeners
    // ---------------------------------------------------------------
    const move = { forward: false, backward: false, left: false, right: false, jump: false, crouch: false };
    
    const onKeyDown = (e) => {
        switch (e.code) {
            case 'KeyW': move.forward = true; break;
            case 'KeyS': move.backward = true; break;
            case 'KeyA': move.left = true; break;
            case 'KeyD': move.right = true; break;
            case 'Space': move.jump = true; break;
            case 'ControlLeft':
            case 'ControlRight':
            case 'KeyC': move.crouch = true; break;
        }
    };
    
    const onKeyUp = (e) => {
        switch (e.code) {
            case 'KeyW': move.forward = false; break;
            case 'KeyS': move.backward = false; break;
            case 'KeyA': move.left = false; break;
            case 'KeyD': move.right = false; break;
            case 'Space': move.jump = false; break;
            case 'ControlLeft':
            case 'ControlRight':
            case 'KeyC': move.crouch = false; break;
        }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // ---------------------------------------------------------------
    // 5. Load Map
    // ---------------------------------------------------------------
    const loader = new GLTFLoader();
    let mapRoot = null;
    let colliders = []; // Flat array of optimized collision meshes

    const CUTOUT_NAME_HINTS = ['foliage', 'leaves', 'tree', 'grass', 'flower', 'flag', 'wires', 'plant', 'bush', 'vine', 'ivy', 'creeper', 'decal'];
    const GLASS_NAME_HINTS = ['glass'];

    loader.load(
        `${import.meta.env.BASE_URL}maps/Haven_deduped.glb?v=` + Date.now(),
        (gltf) => {
            const map = gltf.scene;
            mapRoot = map;
            
            // Re-initialize colliders array
            colliders = [];

            map.traverse((child) => {
                if (!child.isMesh) return;

                if (child.geometry.attributes.color) {
                    child.geometry.deleteAttribute('color');
                }

                // Frustum culling saves GPU draw calls
                child.frustumCulled = true;

                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach(mat => {
                    const name    = (mat.name    || '').toLowerCase();
                    const mesh    = (child.name  || '').toLowerCase();
                    const combined = name + ' ' + mesh;

                    const isFoliage = ['foliage', 'leaves', 'tree', 'bush', 'vine', 'ivy'].some(h => combined.includes(h));
                    const isGlass = GLASS_NAME_HINTS.some(h => name.includes(h));
                    const isSky = combined.includes('sky') || combined.includes('mountain') || combined.includes('bg');

                    // ONLY solid architectural objects cast shadows! Foliage/Glass shadows are extremely expensive.
                    if (!isFoliage && !isGlass && !isSky) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    } else {
                        child.castShadow = false;
                        child.receiveShadow = false;
                    }

                    mat.vertexColors = false;
                    mat.blending     = THREE.NormalBlending;

                    if (GLASS_NAME_HINTS.some(h => name.includes(h))) {
                        mat.transparent = true;
                        mat.depthWrite  = false;
                        mat.alphaTest   = 0;
                        mat.opacity     = 0.35;
                        mat.side = THREE.DoubleSide;
                    } else if (CUTOUT_NAME_HINTS.some(h => combined.includes(h))) {
                        mat.transparent = false;
                        mat.depthWrite  = true;
                        mat.alphaTest   = 0.5;
                        mat.side = THREE.DoubleSide; // Keep DoubleSide for leaves/fences
                        mat.customDepthMaterial = new THREE.MeshDepthMaterial({
                            depthPacking: THREE.RGBADepthPacking,
                            map: mat.map,
                            alphaTest: 0.5
                        });
                    } else {
                        mat.transparent = false;
                        mat.depthWrite  = true;
                        mat.alphaTest   = 0;
                        mat.opacity     = 1.0;
                        mat.alphaMap    = null;
                        mat.side = THREE.FrontSide; // DISABLED DoubleSide for solid walls/floors to halve triangle rasterization!
                    }

                    if (mat.metalness !== undefined) mat.metalness = Math.min(mat.metalness, 0.2); 
                    if (mat.roughness !== undefined) mat.roughness = Math.max(mat.roughness, 0.6);
                    if (mat.emissiveIntensity !== undefined) mat.emissiveIntensity = 0.0;

                    if (combined.includes('sky') || combined.includes('mountain') || combined.includes('bg')) {
                        if (mat.color)    mat.color.setHex(0x87CEEB);
                        if (mat.emissive) {
                            mat.emissive.setHex(0x87CEEB);
                            mat.emissiveIntensity = 1.0;
                        }
                        mat.alphaTest   = 0;
                        mat.transparent = false;
                        mat.fog = false;
                    }

                    // OPTIMIZATION: Only add solid, non-foliage/glass/sky objects to the collision array.
                    if (!isFoliage && !isGlass && !isSky) {
                        child.geometry.computeBoundsTree(); // Generate BVH for lightning-fast raycasting!
                        colliders.push(child);
                    }

                    mat.needsUpdate = true;
                });
            });

            // Add the dirt floor backup plane to colliders
            colliders.push(dirtPlane);

            scene.add(map);

            // Pre-compile shaders so there is no freeze when engaging!
            renderer.compile(scene, camera);
            setLoadingProgress(100);

            setGameState('CONTROLS');
        },
        (xhr) => {
            if (xhr.total > 0) {
                // Cap progress at 90%, leaving the last 10% for parsing/BVH generation
                setLoadingProgress(Math.min(90, Math.round(xhr.loaded / xhr.total * 100)));
            }
        },
        (error) => {
            console.error(error);
        }
    );

    // ---------------------------------------------------------------
    // 6. Animation Loop & Physics
    // ---------------------------------------------------------------
    const timer = new THREE.Timer();
    let speed = 6.0;
    
    let velocityY = 0;
    let canJump = false;
    let currentHeight = 1.7; 
    const GRAVITY = 25.0; 
    const JUMP_FORCE = 8.0;

    const raycaster = new THREE.Raycaster();
    const downRaycaster = new THREE.Raycaster();
    const DOWN = new THREE.Vector3(0, -1, 0);
    const PLAYER_RADIUS = 0.5;
    const forwardVec = new THREE.Vector3();
    const rightVec = new THREE.Vector3();

    function getFloorHeight(origin) {
        if (colliders.length === 0) return null;
        downRaycaster.set(new THREE.Vector3(origin.x, origin.y + 1.0, origin.z), DOWN);
        downRaycaster.far = 20.0; // Increased to ensure it hits the backup dirtPlane if needed
        // Raycast against flat array! BVH automatically accelerates this.
        downRaycaster.firstHitOnly = true; // BVH optimization
        const hits = downRaycaster.intersectObjects(colliders, false);
        if (hits.length > 0) return hits[0].point.y;
        return null;
    }

    function blocked(origin, direction, distance) {
        if (colliders.length === 0 || direction.lengthSq() === 0) return false;
        const testOrigin = origin.clone();
        testOrigin.y -= currentHeight * 0.5;
        raycaster.set(testOrigin, direction);
        raycaster.far = distance + PLAYER_RADIUS;
        raycaster.firstHitOnly = true; // BVH optimization
        const hits = raycaster.intersectObjects(colliders, false);
        return hits.length > 0;
    }

    const onWheel = (e) => {
        if (controls.isLocked) {
            const speedIncrement = 0.5;
            speed += e.deltaY < 0 ? speedIncrement : -speedIncrement;
            speed = Math.max(0.5, Math.min(speed, 30.0));
        }
    };
    document.addEventListener('wheel', onWheel);

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        timer.update();
        const delta = Math.min(timer.getDelta(), 0.1);

        if (controls.isLocked) {
            const distance = speed * delta;

            camera.getWorldDirection(forwardVec);
            forwardVec.y = 0;
            forwardVec.normalize();
            rightVec.crossVectors(forwardVec, camera.up).normalize();

            let moveDir = new THREE.Vector3();
            if (move.forward) moveDir.add(forwardVec);
            if (move.backward) moveDir.sub(forwardVec);
            if (move.right) moveDir.add(rightVec);
            if (move.left) moveDir.sub(rightVec);

            if (moveDir.lengthSq() > 0) {
                moveDir.normalize();
                const origin = camera.position.clone();
                if (!blocked(origin, moveDir, distance)) {
                    controls.moveForward(moveDir.dot(forwardVec) * distance);
                    controls.moveRight(moveDir.dot(rightVec) * distance);
                }
            }

            const targetHeight = move.crouch ? 0.8 : 1.7;
            currentHeight += (targetHeight - currentHeight) * 15 * delta;

            velocityY -= GRAVITY * delta;
            
            if (move.jump && canJump) {
                velocityY = JUMP_FORCE;
                canJump = false;
            }
            
            camera.position.y += velocityY * delta;

            const floorY = getFloorHeight(camera.position);
            if (floorY !== null) {
                if (camera.position.y - currentHeight <= floorY + 0.2) {
                    camera.position.y = floorY + currentHeight;
                    if (velocityY < 0) velocityY = 0; 
                    canJump = true;
                } else {
                    canJump = false; 
                }
            } else {
                canJump = false;
            }
            
            if (camera.position.y < -100) {
                camera.position.set(12.39, 4.7, -22.52);
                velocityY = 0;
            }
        }

        renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
        cancelAnimationFrame(animationFrameId);
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keyup', onKeyUp);
        document.removeEventListener('wheel', onWheel);
        window.removeEventListener('resize', onResize);
        
        controls.dispose();
        renderer.dispose();
        document.removeEventListener('pointerlockerror', onError);
        if (mountRef.current) {
            mountRef.current.innerHTML = '';
        }
    };
  }, []);

  const handleStartGame = () => {
    // Only lock controls if we are in CONTROLS state
    if (gameState === 'CONTROLS') {
      // Instantly hide the overlay for a snappy, zero-delay UI response!
      setGameState('PLAYING');
      
      const domEl = mountRef.current.querySelector('canvas');
      if (domEl) {
          domEl.requestPointerLock();
      }
    }
  };

  return (
    <div className="w-full h-full fixed inset-0 z-50">
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full absolute inset-0" />

      {/* Overlays */}
      {gameState !== 'PLAYING' && (
        <div 
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm z-10"
            style={{
                backgroundImage: `url(${MapViewer_bgc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay'
            }}
        >
            <div className="flex flex-col items-center p-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-sm shadow-2xl">
                <h1 className="text-white text-5xl font-extrabold tracking-widest mb-2 font-[Oswald]">
                    HAVEN
                </h1>
                <p className="text-red-500 font-bold tracking-widest text-sm mb-12">ATTACKER</p>

                {gameState === 'LOADING' && (
                    <div className="flex flex-col items-center w-64">
                        <div className="text-white/70 mb-3 tracking-widest text-xs uppercase font-bold">
                            INITIALIZING SCENE
                        </div>
                        <div className="w-full h-1 bg-white/20 relative overflow-hidden">
                            <div 
                                className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-300 ease-out" 
                                style={{ width: `${loadingProgress}%` }}
                            />
                        </div>
                        <div className="text-white/50 mt-2 text-[10px] tracking-wider">
                            {loadingProgress}%
                        </div>
                    </div>
                )}

                {gameState === 'CONTROLS' && (
                    <div className="flex flex-col items-center">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10 text-xs tracking-widest font-bold">
                            <div className="text-right text-white/50">W A S D</div>
                            <div className="text-white">MOVE</div>
                            
                            <div className="text-right text-white/50">SPACE</div>
                            <div className="text-white">JUMP</div>

                            <div className="text-right text-white/50">CTRL / C</div>
                            <div className="text-white">CROUCH</div>

                            <div className="text-right text-white/50">SCROLL</div>
                            <div className="text-white">SPEED</div>
                        </div>

                        <div 
                            className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white font-bold tracking-widest cursor-pointer transition-colors text-sm mb-4 active:scale-95 shadow-lg"
                            onClick={handleStartGame}
                        >
                            CLICK TO ENGAGE
                        </div>
                        
                        <div 
                            className="px-6 py-2 border border-white/20 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-bold tracking-widest cursor-pointer transition-all text-xs"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onBack) onBack();
                            }}
                        >
                            EXIT TO LOBBY
                        </div>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default MapViewer_page;
