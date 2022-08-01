
// grid : (N-1)**3 cubes with {v1, v2, ..., v7} structure
//    where 'vn' references the nth point on the cube 
//    (set using return value 'points')
// points : N**3 'points' with {x, y, z, v} structure
//    where 'v' is the value used for marching cubes
const getCubeGrid = gridSize => {
   const axis = buildAxes(gridSize);   // same axes for now
   const points = buildPoints(axis);
   const grid = buildGrid(axis, points);

   return {grid, points};
}

// build an axis of length N ranging -1 to 1, equally spaced
const buildAxes = length => {
   if (typeof(length) !== 'number' || length < 2 || Math.floor(length) !== length) throw new Error('buildAxes length argument invalid');
   if (length > 256) throw new Error('buildAxes length argument too large');
   const axis = Array(length);
   for (let i=0; i<length; i++) {
      axis[i] = 2*(i - length/2 + 0.5) / (length-1);
   }
   return axis;
}

// build an N**3 array of points
const buildPoints = axis => {
   if (!axis || !axis.length || typeof(axis) !== 'object') throw new Error('buildPoints axis argument is invalid');
   if ( axis.length < 2) throw new Error('buildPoints axis argument is too small');
   if ( axis.length > 256) throw new Error('buildPoints axis argument is too large');
   for (const n of axis) { 
      if (typeof(n) !== 'number') throw new Error('buildPoints axis argument is invalid'); 
   }
   const points = Array(axis.length*axis.length*axis.length);
   let pos = 0;
   for (const z of axis) {
      for (const y of axis) {
         for (const x of axis) {
            points[pos] = {x, y, z, v: [null]}
            pos++;
         }
      }
   }
   return points;
}

// build an (N-1)**3 array of cubes where each vertex
//    is an object reference to the 'points' array
const buildGrid = (axis, points) => {
   const di = 1;
   const dj = axis.length;
   const dk = axis.length * axis.length;

   const length = axis.length-1;
   const cubes = Array(length*length*length);
   let pos = 0;
   for (let k=0; k<length; k++) {
      for (let j=0; j<length; j++) {
         for (let i=0; i<length; i++) {
            cubes[pos] = {
               v0: points[di*(i  ) + dj*(j  ) + dk*(k  )],
               v1: points[di*(i+1) + dj*(j  ) + dk*(k  )],
               v2: points[di*(i+1) + dj*(j+1) + dk*(k  )],
               v3: points[di*(i  ) + dj*(j+1) + dk*(k  )],
               v4: points[di*(i  ) + dj*(j  ) + dk*(k+1)],
               v5: points[di*(i+1) + dj*(j  ) + dk*(k+1)],
               v6: points[di*(i+1) + dj*(j+1) + dk*(k+1)],
               v7: points[di*(i  ) + dj*(j+1) + dk*(k+1)],
            }
            pos++;
         }
      }
   }
   return cubes;
}

export default getCubeGrid;
export { getCubeGrid, buildAxes, buildGrid, buildPoints };