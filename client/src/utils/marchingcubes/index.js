import { MCUBE_SIZE } from 'config';
import { getCubeGrid } from './getcubegrid';
import { march } from './march';
import setPoints from './setpoints';

const buildCubeGrid = new Promise((resolve, reject) => {
   const { grid, points } = getCubeGrid(MCUBE_SIZE);
   if (grid && points) {
      resolve({ grid, points });
   } else {
      reject(Error('buildCubeGrid unexpectedly failed'));
   }
});

const updatePointValues = (points, values) => {
   setPoints(points, values, MCUBE_SIZE);
};

export { buildCubeGrid, updatePointValues, march };
