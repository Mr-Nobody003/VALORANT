import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import {
  computeBoundsTree,
  disposeBoundsTree,
  acceleratedRaycast,
} from "three-mesh-bvh";

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const COLLIDER_MAX_RADIUS = 300;

export const useMapScene = (mountRef, onBack) => {
  const [gameState, setGameState] = useState("LOADING");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("DOWNLOADING MAP...");

  const [isMobile, setIsMobile] = useState(
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 1024
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId;
    let controls;
    let disposed = false;

    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9ebfd9);
    scene.fog = new THREE.Fog(0xa8c4da, 600, 2600);

    const camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 6000);
    camera.position.set(12.39, 4.7, -22.52);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      powerPreference: "high-performance",
      stencil: false,
    });
    let pixelRatio = isMobile ? 0.75 : Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.info.autoReset = false;

    const maxAniso = Math.min(
      renderer.capabilities.getMaxAnisotropy(),
      isMobile ? 2 : 8
    );

    if (mountRef.current) {
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      mountRef.current.appendChild(renderer.domElement);
    }

    const hemiLight = new THREE.HemisphereLight(0xffe4cc, 0x554433, 0.65);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffc080, 2.8);
    dirLight.position.set(150, 300, 100);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 250;
    dirLight.shadow.camera.bottom = -250;
    dirLight.shadow.camera.left = -250;
    dirLight.shadow.camera.right = 250;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 1500;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    dirLight.shadow.bias = isMobile ? -0.002 : -0.0005;
    dirLight.shadow.normalBias = isMobile ? 0.2 : 0.05;
    scene.add(dirLight);

    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const dirtGeo = new THREE.PlaneGeometry(4000, 4000);
    dirtGeo.computeBoundsTree();
    const dirtMat = new THREE.MeshBasicMaterial({ color: 0x8a8d80 });
    const dirtPlane = new THREE.Mesh(dirtGeo, dirtMat);
    dirtPlane.rotation.x = -Math.PI / 2;
    dirtPlane.position.y = -60;
    scene.add(dirtPlane);

    // controls
    controls = new PointerLockControls(camera, renderer.domElement);
    const onUnlock = () => setGameState("CONTROLS");
    const onError = () => setGameState("CONTROLS");
    controls.addEventListener("unlock", onUnlock);
    document.addEventListener("pointerlockerror", onError);

    const move = {
      forward: false, backward: false, left: false,
      right: false, jump: false, crouch: false,
    };
    const mobileState = { lookId: null, lookLastX: 0, lookLastY: 0 };
    const lookEuler = new THREE.Euler(0, 0, 0, "YXZ");
    const moveDir = new THREE.Vector3();

    const getTouchCoords = (touch) => {
      if (isMobile && window.innerHeight > window.innerWidth) {
        return { x: window.innerHeight - touch.clientY, y: touch.clientX };
      }
      return { x: touch.clientX, y: touch.clientY };
    };

    const KEYS = {
      KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right",
      Space: "jump", ControlLeft: "crouch", ControlRight: "crouch", KeyC: "crouch",
    };
    const onKeyDown = (e) => { const k = KEYS[e.code]; if (k) move[k] = true; };
    const onKeyUp = (e) => { const k = KEYS[e.code]; if (k) move[k] = false; };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    const BTN = {
      "btn-w": "forward", "btn-s": "backward", "btn-a": "left",
      "btn-d": "right", "btn-jump": "jump", "btn-crouch": "crouch",
    };
    const onTouchStart = (e) => {
      if (!(mountRef.current && mountRef.current.isMobileLocked)) return;
      for (const touch of Array.from(e.changedTouches)) {
        const k = BTN[touch.target.id];
        if (k) { move[k] = true; continue; }
        if (touch.target.id === "btn-exit") {
          document.getElementById("btn-exit")?.click();
          continue;
        }
        if (mobileState.lookId === null) {
          const { x, y } = getTouchCoords(touch);
          mobileState.lookId = touch.identifier;
          mobileState.lookLastX = x;
          mobileState.lookLastY = y;
        }
      }
    };
    const onTouchMove = (e) => {
      if (!(mountRef.current && mountRef.current.isMobileLocked)) return;
      for (const touch of Array.from(e.changedTouches)) {
        if (touch.identifier !== mobileState.lookId) continue;
        const { x, y } = getTouchCoords(touch);
        const dx = x - mobileState.lookLastX;
        const dy = y - mobileState.lookLastY;
        mobileState.lookLastX = x;
        mobileState.lookLastY = y;
        lookEuler.setFromQuaternion(camera.quaternion);
        lookEuler.y -= dx * 0.005;
        lookEuler.x -= dy * 0.005;
        lookEuler.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, lookEuler.x));
        camera.quaternion.setFromEuler(lookEuler);
      }
    };
    const onTouchEnd = (e) => {
      if (!(mountRef.current && mountRef.current.isMobileLocked)) return;
      for (const touch of Array.from(e.changedTouches)) {
        const k = BTN[touch.target.id];
        if (k) move[k] = false;
        if (touch.identifier === mobileState.lookId) mobileState.lookId = null;
      }
    };
    if (isMobile) {
      document.addEventListener("touchstart", onTouchStart);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);
      document.addEventListener("touchcancel", onTouchEnd);
    }

    // map loading
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    let mapRoot = null;
    let colliders = [];

    const tuneMaterial = (mat, kind) => {
      if (mat.map) {
        mat.map.colorSpace = THREE.SRGBColorSpace;
        mat.map.anisotropy = maxAniso;
      }
      mat.toneMapped = true;
      mat.fog = kind !== "SKY";

      const isCutout = mat.alphaTest > 0;
      const isGlass = mat.transparent && !isCutout && /glass/i.test(mat.name || "");

      if (kind === "SKY") {
        mat.transparent = false;
        mat.depthWrite = false;
        mat.side = THREE.BackSide;
      } else if (isGlass) {
        mat.transparent = true;
        mat.depthWrite = false;
        mat.opacity = 0.35;
        mat.side = THREE.DoubleSide;
      } else {
        mat.transparent = false;
        mat.depthWrite = true;
        mat.side = THREE.DoubleSide; 
      }
      mat.needsUpdate = true;
    };

    const pendingColliders = [];

    const processMapChunk = (group, kind) => {
      group.traverse((child) => {
        if (!child.isMesh) return;
        child.geometry.computeBoundingSphere();
        child.geometry.computeBoundingBox();
        child.frustumCulled = false;
        child.castShadow = true;
        child.receiveShadow = true;

        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((m) => tuneMaterial(m, kind));

        if (kind === "SKY") {
          child.renderOrder = -1;
          return;
        }
        if (kind === "FOLIAGE") return;

        const r = child.geometry.boundingSphere?.radius ?? 0;
        if (r > 0 && r < COLLIDER_MAX_RADIUS) pendingColliders.push(child);
      });
    };

    const loadGLTF = (url, offset, scale) =>
      new Promise((resolve, reject) => {
        loader.load(url, resolve, (xhr) => {
          if (xhr.total > 0) {
            setLoadingProgress(
              Math.round(offset + (xhr.loaded / xhr.total) * 100 * scale)
            );
          }
        }, reject);
      });

    const yieldToPaint = () => new Promise((r) => setTimeout(r, 0));

    const loadMap = async () => {
      try {
        const base = import.meta.env.BASE_URL;
        const tier = isMobile ? "mobile" : "desktop";
        mapRoot = new THREE.Group();

        const cb = `?v=${Date.now()}`;
        setLoadingText("DOWNLOADING MAP...");
        const solid = await loadGLTF(`${base}maps/Haven_Solid.${tier}.glb${cb}`, 0, 0.55);
        processMapChunk(solid.scene, "SOLID");
        mapRoot.add(solid.scene);

        setLoadingText("DOWNLOADING FOLIAGE...");
        const foliage = await loadGLTF(`${base}maps/Haven_Foliage.${tier}.glb${cb}`, 55, 0.2);
        processMapChunk(foliage.scene, "FOLIAGE");
        mapRoot.add(foliage.scene);

        setLoadingText("DOWNLOADING SKYBOX...");
        const sky = await loadGLTF(`${base}maps/Haven_Sky.${tier}.glb${cb}`, 75, 0.05);
        processMapChunk(sky.scene, "SKY");
        mapRoot.add(sky.scene);

        if (disposed) return;
        scene.add(mapRoot);

        mapRoot.updateMatrixWorld(true);
        mapRoot.traverse((o) => { o.matrixAutoUpdate = false; });

        setLoadingText("BUILDING COLLISION...");
        for (let i = 0; i < pendingColliders.length; i++) {
          const mesh = pendingColliders[i];
          mesh.geometry.computeBoundsTree(
            isMobile ? { maxLeafTris: 64 } : { maxLeafTris: 16 }
          );
          colliders.push(mesh);
          if (i % 12 === 0) {
            setLoadingProgress(80 + Math.round((i / pendingColliders.length) * 15));
            await yieldToPaint();
            if (disposed) return;
          }
        }
        colliders.push(dirtPlane);

        setLoadingText("COMPILING SHADERS...");
        setLoadingProgress(97);
        await yieldToPaint();
        if (renderer.compileAsync) await renderer.compileAsync(scene, camera);
        else renderer.compile(scene, camera);

        setLoadingProgress(100);
        setGameState("CONTROLS");
      } catch (err) {
        console.error("Map load failed:", err);
        setLoadingText("ERROR LOADING MAP");
      }
    };

    loadMap();

    // physics + rendering
    const timer = new THREE.Timer();
    let speed = 6.0;
    let velocityY = 0;
    let canJump = false;
    let currentHeight = 1.7;
    const GRAVITY = 25.0;
    const JUMP_FORCE = 8.0;
    const PLAYER_RADIUS = 0.5;

    const raycaster = new THREE.Raycaster();
    const downRaycaster = new THREE.Raycaster();
    const DOWN = new THREE.Vector3(0, -1, 0);
    const forwardVec = new THREE.Vector3();
    const rightVec = new THREE.Vector3();
    const originVec = new THREE.Vector3();

    raycaster.firstHitOnly = true;
    downRaycaster.firstHitOnly = true;

    const getFloorHeight = (origin) => {
      if (!colliders.length) return null;
      downRaycaster.set(
        originVec.set(origin.x, origin.y + 1.0, origin.z),
        DOWN
      );
      downRaycaster.far = 20.0;
      const hits = downRaycaster.intersectObjects(colliders, false);
      return hits.length ? hits[0].point.y : null;
    };

    const blocked = (origin, direction, distance) => {
      if (!colliders.length || direction.lengthSq() === 0) return false;
      raycaster.set(
        originVec.set(origin.x, origin.y - currentHeight * 0.5, origin.z),
        direction
      );
      raycaster.far = distance + PLAYER_RADIUS;
      return raycaster.intersectObjects(colliders, false).length > 0;
    };

    const onWheel = (e) => {
      if (!controls.isLocked) return;
      speed += e.deltaY < 0 ? 0.5 : -0.5;
      speed = Math.max(0.5, Math.min(speed, 30.0));
    };
    document.addEventListener("wheel", onWheel);

    let frames = 0;
    let fpsClock = performance.now();
    const MIN_RATIO = isMobile ? 0.45 : 0.6;
    const MAX_RATIO = isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      timer.update();
      const delta = Math.min(timer.getDelta(), 0.1);

      const isLocked =
        controls.isLocked ||
        (mountRef.current && mountRef.current.isMobileLocked);

      if (isLocked) {
        const distance = speed * delta;

        camera.getWorldDirection(forwardVec);
        forwardVec.y = 0;
        forwardVec.normalize();
        rightVec.crossVectors(forwardVec, camera.up).normalize();

        moveDir.set(0, 0, 0);
        if (move.forward) moveDir.add(forwardVec);
        if (move.backward) moveDir.sub(forwardVec);
        if (move.right) moveDir.add(rightVec);
        if (move.left) moveDir.sub(rightVec);

        if (moveDir.lengthSq() > 0) {
          moveDir.normalize();
          if (!blocked(camera.position, moveDir, distance)) {
            controls.moveForward(moveDir.dot(forwardVec) * distance);
            controls.moveRight(moveDir.dot(rightVec) * distance);
          }
        }

        const targetHeight = move.crouch ? 0.8 : 1.7;
        currentHeight += (targetHeight - currentHeight) * 15 * delta;

        velocityY -= GRAVITY * delta;
        if (move.jump && canJump) { velocityY = JUMP_FORCE; canJump = false; }
        camera.position.y += velocityY * delta;

        const floorY = getFloorHeight(camera.position);
        if (floorY !== null && camera.position.y - currentHeight <= floorY + 0.2 && velocityY <= 0) {
          camera.position.y = floorY + currentHeight;
          if (velocityY < 0) velocityY = 0;
          canJump = true;
        } else {
          canJump = false;
        }

        if (camera.position.y < -20) {
          camera.position.set(12.39, 4.7, -22.52);
          velocityY = 0;
        }
      }

      renderer.render(scene, camera);

      frames++;
      const now = performance.now();
      if (now - fpsClock >= 1000) {
        const fps = (frames * 1000) / (now - fpsClock);
        frames = 0;
        fpsClock = now;
        let next = pixelRatio;
        if (fps < 45 && pixelRatio > MIN_RATIO) next = Math.max(MIN_RATIO, pixelRatio - 0.15);
        else if (fps > 58 && pixelRatio < MAX_RATIO) next = Math.min(MAX_RATIO, pixelRatio + 0.1);
        if (next !== pixelRatio) {
          pixelRatio = next;
          renderer.setPixelRatio(pixelRatio);
        }
      }
    };
    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (!width || !height) continue;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      }
    });
    if (mountRef.current) resizeObserver.observe(mountRef.current);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("wheel", onWheel);
      document.removeEventListener("pointerlockerror", onError);
      resizeObserver.disconnect();
      if (isMobile) {
        document.removeEventListener("touchstart", onTouchStart);
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
        document.removeEventListener("touchcancel", onTouchEnd);
      }
      if (mapRoot) {
        mapRoot.traverse((child) => {
          if (!child.isMesh) return;
          if (child.geometry) {
            if (child.geometry.boundsTree) child.geometry.disposeBoundsTree();
            child.geometry.dispose();
          }
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((m) => { m?.map?.dispose(); m?.dispose(); });
        });
      }
      dirtGeo.disposeBoundsTree();
      dirtGeo.dispose();
      dirtMat.dispose();
      controls.dispose();
      renderer.dispose();
      if (mountRef.current) mountRef.current.innerHTML = "";
    };
  }, [mountRef]);

  return { gameState, setGameState, loadingProgress, loadingText, isMobile };
};
