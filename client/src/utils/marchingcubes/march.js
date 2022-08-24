import { MAX_INDICES } from '@/config';
import { edgeTable, triTable } from './tables';

const interpolate = (p1, p2, val) => {
   const del = (val - p1.v) / (p2.v - p1.v);
   return [p1.x + del * (p2.x - p1.x), p1.y + del * (p2.y - p1.y), p1.z + del * (p2.z - p1.z)];
};

// reference: http://paulbourke.net/geometry/polygonise/
const march = (cubes, isoval) => {
   const indices = new Uint16Array(MAX_INDICES);
   const vertices = new Float32Array(MAX_INDICES * 3);

   let container = []; // we need to produce multiple objects
   let nInd = 0;
   let nVert = 0;
   cubes.forEach((cube) => {
      // find cube indices
      let cubeIndices = 0;
      cubeIndices |= cube.v0.v < isoval ? 1 : 0;
      cubeIndices |= cube.v1.v < isoval ? 2 : 0;
      cubeIndices |= cube.v2.v < isoval ? 4 : 0;
      cubeIndices |= cube.v3.v < isoval ? 8 : 0;
      cubeIndices |= cube.v4.v < isoval ? 16 : 0;
      cubeIndices |= cube.v5.v < isoval ? 32 : 0;
      cubeIndices |= cube.v6.v < isoval ? 64 : 0;
      cubeIndices |= cube.v7.v < isoval ? 128 : 0;

      // find edge vertices
      const verts = Array(12);
      verts[0] = edgeTable[cubeIndices] & 1 ? interpolate(cube.v0, cube.v1, isoval) : null;
      verts[1] = edgeTable[cubeIndices] & 2 ? interpolate(cube.v1, cube.v2, isoval) : null;
      verts[2] = edgeTable[cubeIndices] & 4 ? interpolate(cube.v2, cube.v3, isoval) : null;
      verts[3] = edgeTable[cubeIndices] & 8 ? interpolate(cube.v3, cube.v0, isoval) : null;
      verts[4] = edgeTable[cubeIndices] & 16 ? interpolate(cube.v4, cube.v5, isoval) : null;
      verts[5] = edgeTable[cubeIndices] & 32 ? interpolate(cube.v5, cube.v6, isoval) : null;
      verts[6] = edgeTable[cubeIndices] & 64 ? interpolate(cube.v6, cube.v7, isoval) : null;
      verts[7] = edgeTable[cubeIndices] & 128 ? interpolate(cube.v7, cube.v4, isoval) : null;
      verts[8] = edgeTable[cubeIndices] & 256 ? interpolate(cube.v0, cube.v4, isoval) : null;
      verts[9] = edgeTable[cubeIndices] & 512 ? interpolate(cube.v1, cube.v5, isoval) : null;
      verts[10] = edgeTable[cubeIndices] & 1024 ? interpolate(cube.v2, cube.v6, isoval) : null;
      verts[11] = edgeTable[cubeIndices] & 2048 ? interpolate(cube.v3, cube.v7, isoval) : null;

      // reference triangle table
      for (let i = 0; triTable[cubeIndices][i] !== -1; i += 3) {
         // loop through each point on the triangle
         for (let n = 0; n < 3; n++) {
            const vert = verts[triTable[cubeIndices][i + n]];
            [vertices[nVert], vertices[nVert + 1], vertices[nVert + 2]] = vert;
            nVert += 3;
         }

         // add the triangle indices
         indices[nInd + 0] = nInd;
         indices[nInd + 1] = nInd + 1;
         indices[nInd + 2] = nInd + 2;
         nInd += 3;

         // move to new array if we reach max index count
         if (nInd >= MAX_INDICES) {
            container = container.concat({
               indices: indices.slice(),
               vertices: vertices.slice(),
            });
            nInd = 0;
            nVert = 0;
         }
      }
   });

   return container.concat({
      indices: indices.slice(0, nInd),
      vertices: vertices.slice(0, nVert),
   });
};

export { march, interpolate };
