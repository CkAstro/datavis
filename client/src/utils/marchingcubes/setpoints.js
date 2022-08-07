const setPoints = (points, values, size) => {
   if (!points.length || !values.length || points.length !== values.length)
      throw new Error('setPoints points or values not of same size');
   let pos = 0;
   for (let k = 0; k < size; k++) {
      for (let j = 0; j < size; j++) {
         for (let i = 0; i < size; i++) {
            points[pos].v = values[pos];
            pos++;
         }
      }
   }
};

export default setPoints;
