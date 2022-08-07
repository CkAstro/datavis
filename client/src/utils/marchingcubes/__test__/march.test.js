import { MAX_INDICES } from 'config';
import { march, interpolate } from '../march';
import { getCubeGrid } from '../getcubegrid';

jest.mock('config/config');

describe('interpolate', () => {
   test('basic interp', () => {
      const p1 = { x: 1, y: -1, z: 3, v: 0.2 };
      const p2 = { x: 2, y: 2, z: 8, v: 1.2 };
      const val = 0.7;

      const expected = [1.5, 0.5, 5.5];
      const received = interpolate(p1, p2, val);
      expect(received.length).toEqual(3);

      // check each item
      for (let i = 0; i < 3; i++) {
         expect(received[i]).toBeCloseTo(expected[i]);
      }
   });

   test('val set to p1', () => {
      const p1 = { x: 0.5, y: 0.25, z: 0.1, v: 0.3 };
      const p2 = { x: 1.2, y: 1.3, z: 4.1, v: 0.4 };
      const val = 0.3;

      const expected = [0.5, 0.25, 0.1];
      const received = interpolate(p1, p2, val);

      // check each item
      for (let i = 0; i < 3; i++) {
         expect(received[i]).toBeCloseTo(expected[i]);
      }
   });

   test('val set to p2', () => {
      const p1 = { x: 0.5, y: 0.25, z: 0.1, v: 0.3 };
      const p2 = { x: 1.2, y: 1.3, z: 4.1, v: 0.4 };
      const val = 0.4;

      const expected = [1.2, 1.3, 4.1];
      const received = interpolate(p1, p2, val);

      // check each item
      for (let i = 0; i < 3; i++) {
         expect(received[i]).toBeCloseTo(expected[i]);
      }
   });
});

describe('march', () => {
   test('', () => {});

   test('test small grid', () => {
      const size = 3;
      const { grid, points } = getCubeGrid(size);
      const val = 0.5;

      let pos = 0;
      for (let k = 0; k < size; k++) {
         for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {
               points[pos].v = i === 1 && j === 1 && k === 1 ? 1 : 0;
               pos++;
            }
         }
      }

      const cubes = march(grid, val);

      // all 8 cubes should have a single triangle, pointing to the center;
      // we expect 8*3 indices (triangle points)
      expect(cubes[0].indices.length).toEqual(8 * 3);
      // and 8*3*3 vertices (vertex i,j,k)
      expect(cubes[0].vertices.length).toEqual(8 * 3 * 3);

      // we also expect each vertex to be on the x/y/z axis
      for (let ind = 0; ind < cubes[0].vertices.length; ind += 3) {
         const vert = cubes[0].vertices.slice(ind, ind + 3);
         expect(
            Math.abs(vert[0]) === 0.5 ||
               Math.abs(vert[1]) === 0.5 ||
               Math.abs(vert[2]) === 0.5
         ).toBeTruthy();
         expect(
            Math.abs(vert[0]) === 0.5 && Math.abs(vert[1]) === 0.5
         ).toBeFalsy();
         expect(
            Math.abs(vert[1]) === 0.5 && Math.abs(vert[2]) === 0.5
         ).toBeFalsy();
         expect(
            Math.abs(vert[2]) === 0.5 && Math.abs(vert[0]) === 0.5
         ).toBeFalsy();
      }
   });

   test('test inverse grid', () => {
      const size = 3;
      const grid1 = getCubeGrid(size);
      const grid2 = getCubeGrid(size);
      const val = 0.5;

      let pos = 0;
      for (let k = 0; k < size; k++) {
         for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {
               grid1.points[pos].v = i === 1 && j === 1 && k === 1 ? 1 : 0;
               grid2.points[pos].v = i === 1 && j === 1 && k === 1 ? 0 : 1;
               pos++;
            }
         }
      }

      const cubes1 = march(grid1.grid, val);
      const cubes2 = march(grid2.grid, val);

      // triangles should be in same order but with normal facing other way
      // e.g. they are drawn
      //         2           3
      //       / |   ->    / |
      //     1 --3       1 --2
      for (let ind = 0; ind < cubes1[0].vertices.length; ind += 9) {
         const tri1 = cubes1[0].vertices.slice(ind, ind + 9);
         const tri2 = cubes2[0].vertices.slice(ind, ind + 9);

         expect(tri1.slice(0, 3)).toEqual(tri2.slice(0, 3)); // first point
         expect(tri1.slice(3, 6)).toEqual(tri2.slice(6, 9)); // second point
         expect(tri1.slice(6, 9)).toEqual(tri2.slice(3, 6)); // third point
      }
   });

   test('ensure correct sizing of split objects', () => {
      const size = 5;
      const expectedLength = 15; // assuming size=5 and val=0.5 with v = r**2/3
      const { grid, points } = getCubeGrid(size);
      const val = 0.5;

      let pos = 0;
      for (let k = 0; k < size; k++) {
         for (let j = 0; j < size; j++) {
            for (let i = 0; i < size; i++) {
               const { x, y, z } = points[pos];
               points[pos].v = (x * x + y * y + z * z) / 3;
               pos++;
            }
         }
      }

      const cubes = march(grid, val);
      expect(cubes.length).toEqual(expectedLength);
      cubes.slice(0, -1).forEach((cube) => {
         expect(cube.indices[0]).toEqual(0); // make sure it always resets
         expect(cube.indices.length).toEqual(MAX_INDICES);
         expect(cube.vertices.length).toEqual(MAX_INDICES * 3);
      });

      expect(cubes[cubes.length - 1].indices[0]).toEqual(0);
      expect(cubes[cubes.length - 1].indices.length).toBeLessThan(MAX_INDICES);
      expect(cubes[cubes.length - 1].vertices.length).toBeLessThan(
         MAX_INDICES * 3
      );
   });
});
