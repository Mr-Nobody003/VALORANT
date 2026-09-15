# Valorant Map Import & Bugfixing Runbook

This document serves as a knowledge base and runbook for importing, optimizing, and rendering new Valorant maps (Bind, Split, Ascent, etc.) in this project. It documents the massive pitfalls we encountered with the `Haven` map and how to completely avoid them for future maps.

## 1. The "Fake Lit" Export Issue & Missing Colors
**The Problem:** Maps exported directly from Valorant (Unreal Engine) using UModel/FModel **do not contain baked lightmaps**. To make the map visible in standard viewers, the exporter uses a "fake lit" trick: it copies the raw albedo (diffuse) texture into the `emissiveTexture` slot and sets `emissiveFactor` to `1.0`. This causes the map to glow at 100% brightness, simulating an unlit scene.
Furthermore, walls (like the Bhutanese plaster walls in Haven) are actually completely flat white textures. When you strip the emissive glow and render them without real-time shadows, they look like broken, texture-less white voids, leading you to believe the "colors are missing."

**The Solution:**
- **DO NOT** convert materials to `KHR_materials_unlit`. This completely destroys the depth of the map.
- Strip the `emissiveTexture` and `emissiveFactor` from the GLB to stop it from glowing in the dark.
- Load the materials as standard PBR materials (`MeshStandardMaterial`).
- You MUST inject a real-time `DirectionalLight` (Sun) and `HemisphereLight` (Sky/Ground bounce) into the Three.js scene so that the flat white walls receive shadows and ambient occlusion.

## 2. Shadow Acne (Zebra Stripes)
**The Problem:** Once you add a `DirectionalLight` that casts shadows over a massive 4000x4000 map, the shadow map resolution is stretched. This causes large flat surfaces (like the ground and walls) to cast shadows onto themselves, resulting in extreme, dark, diagonal "zebra stripes" covering the map.

**The Solution:**
Always apply a negative bias and a normal bias to your sun's shadow camera:
```javascript
dirLight.shadow.bias = -0.0005;
dirLight.shadow.normalBias = 0.05;
```

## 3. Falling Through the Floor (No Collisions)
**The Problem:** When building the `three-mesh-bvh` collision tree, the player would immediately fall through the floor. This happens if the physical dimensions of the mesh chunks evaluate to `0`.

**The Solution:**
Before generating the BVH or deciding which meshes to use as colliders, you **must** instruct Three.js to calculate the math boundaries of the geometry. Never delete these lines in the loading loop:
```javascript
child.geometry.computeBoundingSphere();
child.geometry.computeBoundingBox();
```

## 4. Mobile Devices & Touch UI Issues
### Issue A: Missing Mobile Controls
**The Problem:** iPad Pros and large tablets report a window width of exactly `1024px`. A strict `< 1024` mobile check will assume the device is a desktop and hide the on-screen WASD controls.
**The Solution:** Use `<=` for the width threshold.
```javascript
const isMobile = /Android|webOS.../i.test(navigator.userAgent) || window.innerWidth <= 1024;
```

### Issue B: Long-Press Context Menus
**The Problem:** Holding down the on-screen WASD buttons triggers the mobile browser's default context menu (Copy, Share, Select Text).
**The Solution:** Apply the following CSS properties and event handlers to the mobile UI wrapper to completely disable web-app interactions:
```javascript
<div 
  className="touch-none select-none"
  style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none" }}
  onContextMenu={(e) => e.preventDefault()}
>
```

## 5. Material Optimization Script (`bake-map.mjs`) Rules
When writing scripts to compress and split the raw `170MB` GLTF files via `@gltf-transform`:
- **DO NOT** delete the `COLOR_0` vertex attribute. Valorant uses vertex colors to heavily tint and blend textures. Deleting this will break the colors.
- **DO NOT** aggressively delete meshes just because their textures are purely grayscale or white. Plaster walls and asphalt are often perfectly colorless and rely on real-time engine lighting.
- Set `mat.setMetallicFactor(0)` and `mat.setRoughnessFactor(1)` to ensure the walls aren't shiny like plastic.
- Use `MeshoptDecoder` and WebP compression, which reliably drops a map from 170MB down to ~15MB for mobile.

## 6. Tone Mapping
**The Problem:** Everything looks gray, gloomy, and washed out, like it is about to rain.
**The Solution:** Since we are lighting the map dynamically with PBR, we must use a cinematic tone mapper. Do not disable tone mapping.
```javascript
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1; // adjust for brightness
```
