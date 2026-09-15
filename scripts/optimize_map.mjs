import fs from 'fs';
import { NodeIO } from '@gltf-transform/core';
import { dedup, prune } from '@gltf-transform/functions';
import { KHRMaterialsEmissiveStrength } from '@gltf-transform/extensions';

async function processGLB() {
  const io = new NodeIO().registerExtensions([
      KHRMaterialsEmissiveStrength
  ]);
  const sourceFile = 'dist/maps/Haven.glb';
  
  if (!fs.existsSync(sourceFile)) {
      console.error(`Cannot find ${sourceFile}`);
      return;
  }

  const CUTOUT_NAME_HINTS = ['foliage', 'leaves', 'tree', 'bush', 'vine', 'ivy'];
  const GLASS_NAME_HINTS = ['glass'];

  const isMeshType = (mesh) => {
      let isFoliage = false;
      let isGlass = false;
      let isSky = false;
      
      const materials = [];
      for (const prim of mesh.listPrimitives()) {
          const mat = prim.getMaterial();
          if (mat) materials.push(mat);
      }
      
      materials.forEach(mat => {
          const name = (mat.getName() || '').toLowerCase();
          const meshName = (mesh.getName() || '').toLowerCase();
          const combined = name + ' ' + meshName;
          
          if (CUTOUT_NAME_HINTS.some(h => combined.includes(h))) isFoliage = true;
          if (GLASS_NAME_HINTS.some(h => name.includes(h))) isGlass = true;
          if (combined.includes('sky') || combined.includes('mountain') || combined.includes('bg')) isSky = true;
      });
      
      if (isSky) return 'SKY';
      if (isFoliage || isGlass) return 'FOLIAGE';
      return 'SOLID';
  };

  // 1. SOLID
  console.log('Building Solid chunk...');
  const docSolid = await io.read(sourceFile);
  for (const node of docSolid.getRoot().listNodes()) {
      const mesh = node.getMesh();
      if (!mesh) continue;
      if (isMeshType(mesh) !== 'SOLID') {
          node.setMesh(null);
      }
  }
  await docSolid.transform(prune(), dedup());
  if (!fs.existsSync('public/maps')) fs.mkdirSync('public/maps', { recursive: true });
  await io.write('public/maps/Haven_Solid.glb', docSolid);
  console.log('Saved public/maps/Haven_Solid.glb');

  // 2. FOLIAGE
  console.log('Building Foliage chunk...');
  const docFoliage = await io.read(sourceFile);
  for (const node of docFoliage.getRoot().listNodes()) {
      const mesh = node.getMesh();
      if (!mesh) continue;
      if (isMeshType(mesh) !== 'FOLIAGE') {
          node.setMesh(null);
      }
  }
  await docFoliage.transform(prune(), dedup());
  await io.write('public/maps/Haven_Foliage.glb', docFoliage);
  console.log('Saved public/maps/Haven_Foliage.glb');

  // 3. SKY
  console.log('Building Sky chunk...');
  const docSky = await io.read(sourceFile);
  for (const node of docSky.getRoot().listNodes()) {
      const mesh = node.getMesh();
      if (!mesh) continue;
      if (isMeshType(mesh) !== 'SKY') {
          node.setMesh(null);
      }
  }
  await docSky.transform(prune(), dedup());
  await io.write('public/maps/Haven_Sky.glb', docSky);
  console.log('Saved public/maps/Haven_Sky.glb');

  console.log('Done splitting Haven.glb!');
}

processGLB().catch(console.error);
