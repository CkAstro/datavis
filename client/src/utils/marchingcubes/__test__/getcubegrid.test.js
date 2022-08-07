import { getCubeGrid, buildAxes, buildGrid, buildPoints } from '../getcubegrid';

describe('buildAxes', () => {
   test('ensure correct length', () => {
      const length = 5;
      expect(buildAxes(length).length).toEqual(length);
   });

   test('ensure range from -1 to 1', () => {
      const length = 10;
      const axis = buildAxes(length);

      // bounds
      expect(axis[0]).toEqual(-1);
      expect(axis[length - 1]).toEqual(1);

      // increasing order
      let prev = axis[0];
      for (let i = 1; i < length; i++) {
         expect(axis[i]).toBeGreaterThan(prev);
         prev = axis[i];
      }
   });

   test('invalid length', () => {
      const err = new Error('buildAxes length argument invalid');
      expect(() => buildAxes('3')).toThrow(err);
      expect(() => buildAxes(0)).toThrow(err);
      expect(() => buildAxes(-14)).toThrow(err);
      expect(() => buildAxes(5.3)).toThrow(err);
   });

   test('length too large', () => {
      const err = new Error('buildAxes length argument too large');
      expect(() => buildAxes(1e10)).toThrow(err);
      expect(() => buildAxes(257)).toThrow(err);
   });
});

// NOTE : buildPoints will assume axis is correctly ordered
// and ranges from -1 to 1
describe('buildPoints', () => {
   test('correct size', () => {
      const length = 5;
      const axis = buildAxes(length);

      const points = buildPoints(axis);
      expect(points.length).toEqual(length ** 3);
   });

   test('correct coordinates', () => {
      const length = 3;
      const axis = buildAxes(length); // [-1, 0, 1]
      const testAxis = [-1, 0, 1];

      const points = buildPoints(axis);
      testAxis.forEach((k) => {
         testAxis.forEach((j) => {
            testAxis.forEach((i) => {
               const testPoint = points.filter(
                  (point) => point.x === i && point.y === j && point.z === k
               );
               expect(testPoint.length).toEqual(1);
            });
         });
      });
   });

   test('invalid axis', () => {
      const err = new Error('buildPoints axis argument is invalid');
      expect(() => buildPoints('a')).toThrow(err);
      expect(() => buildPoints(['a', 'b', 'c'])).toThrow(err);
      expect(() => buildPoints([1, 2, '3'])).toThrow(err);
   });

   test('invalid axis size', () => {
      const smallErr = new Error('buildPoints axis argument is too small');
      const largeErr = new Error('buildPoints axis argument is too large');
      expect(() => buildPoints([1])).toThrow(smallErr);
      expect(() => buildPoints(Array(257).fill(1))).toThrow(largeErr);
   });
});

describe('buildGrid', () => {
   test('correct size', () => {
      const size = 3;
      const axis = buildAxes(size + 1);
      const points = buildPoints(axis);
      const grid = buildGrid(axis, points);

      expect(grid.length).toEqual(size ** 3);
   });

   test('cube has correct elements', () => {
      const axis = buildAxes(3);
      const points = buildPoints(axis);
      const grid = buildGrid(axis, points);

      const expectedKeys = ['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7'];
      const keys = Object.keys(grid[0]);
      expect(keys).toEqual(expectedKeys);
      expect(keys).not.toEqual(expectedKeys.slice(1)); // key missing
   });

   test('verify references', () => {
      // we create a (N-1)**3 grid where grid[0], grid[1], grid[2] align on x
      const axis = buildAxes(4); // using 3 will fail this test
      const points = buildPoints(axis);
      const grid = buildGrid(axis, points);

      expect(grid[0].v1).toEqual(grid[1].v0);
      expect(grid[0].v0).not.toEqual(grid[1].v0);

      const testVal = 6;
      grid[2].v0.v = testVal;
      expect(grid[1].v1.v).toEqual(testVal);
      expect(grid[1].v1).toEqual(grid[2].v0);
   });
});

describe('getCubeGrid', () => {
   test('ensure length and reference', () => {
      // simply a repeat of above tests to ensure function works
      const size = 3; // test will fail if set to 2
      const { grid } = getCubeGrid(size + 1);

      expect(grid.length).toEqual(size ** 3);

      const testVal = 'a';
      grid[2].v0.v = testVal;
      expect(grid[1].v1.v).toEqual(testVal);
      expect(grid[1].v1).toEqual(grid[2].v0);
   });

   test('ensure points reference', () => {
      // simply a repeat of above tests to ensure function works
      const size = 3; // test will fail if set to 2
      const { grid, points } = getCubeGrid(size + 1);

      const testVal = 'a';
      points[2].v = testVal;
      expect(grid[1].v1.v).toEqual(testVal);
      expect(grid[2].v0.v).toEqual(testVal);
      expect(grid[1].v1).toEqual(grid[2].v0);
   });
});
