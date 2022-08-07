import { buildCubeGrid, updatePointValues, march } from '../marchingcubes';
import initBuffers from './initbuffers';

class MarchingCube {
   constructor(gl, shaderProgram) {
      this.glInstance = gl;
      this.shaderProgram = shaderProgram;
      this.buffers = [null];
      this.isInit = false;
   }

   async init(texHelper, val) {
      return new Promise((resolve, reject) => {
         buildCubeGrid
            .then(({ grid, points }) => {
               this.grid = grid;
               this.points = points;
               this.isInit = true;
            })
            .then(() => texHelper.getValues(0))
            .then((vals) => updatePointValues(this.points, vals))
            .then(() => march(this.grid, val))
            .then((cubes) => {
               this.buffers = cubes.map((buffer) =>
                  initBuffers(this.glInstance, buffer)
               );
            })
            .then(() => resolve())
            .catch((err) => reject(err));
      });
   }

   render() {
      for (let i = 0; i < this.buffers.length; i++) this.renderCubePart(i);
   }

   renderCubePart(ind) {
      const gl = this.glInstance;
      const buffer = this.buffers[ind];

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertices);
      gl.vertexAttribPointer(
         this.shaderProgram.attribLocations.vertexPosition,
         3,
         gl.FLOAT,
         false,
         0,
         0
      );
      gl.enableVertexAttribArray(
         this.shaderProgram.attribLocations.vertexPosition
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indices);
      gl.drawElements(gl.TRIANGLES, buffer.indexCount, gl.UNSIGNED_SHORT, 0);
   }
}

export default MarchingCube;
