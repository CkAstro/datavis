import getCubeGrid from './getcubegrid';
import setPoints from './setpoints';
import march from './march';
import { MCUBE_SIZE } from 'config';

const buildCubeGrid = new Promise((resolve, reject) => {
   const { grid, points } = getCubeGrid(MCUBE_SIZE);
   if (grid && points) return resolve({grid, points});
   return reject(Error('uh oh'));
});

const updatePointValues = (points, values) => {
   setPoints(points, values, MCUBE_SIZE);
}

export { buildCubeGrid, updatePointValues, march }