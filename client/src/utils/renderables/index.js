import { buildCubeGrid, updatePointValues, march } from '../marchingcubes';
import { texHelper } from 'utils';
import shapes from './shapes';

const initBuffers = (gl, shape) => {
   const vertexBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.vertices), gl.STATIC_DRAW);

   const indexBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

   return {
      vertices: vertexBuffer,
      indices: indexBuffer,
      indexCount: shape.indices.length,
   }
}

class Renderable {
   constructor(gl, shaderProgram) {
      this.glInstance = gl;
      this.shaderProgram = shaderProgram;
   }

   render() {
      const gl = this.glInstance;

      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertices);
      gl.vertexAttribPointer(
         this.shaderProgram.attribLocations.vertexPosition, 
         3, gl.FLOAT, false, 0, 0,
      );
      gl.enableVertexAttribArray(this.shaderProgram.attribLocations.vertexPosition);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
      gl.drawElements(gl.TRIANGLES, this.buffers.indexCount, gl.UNSIGNED_SHORT, 0);
   }
}

class Slice extends Renderable {
   constructor(gl, shaderProgram) {
      super(gl, shaderProgram);
      this.buffers = initBuffers(gl, shapes.square);
   }
}

class Sphere extends Renderable {
   constructor(gl, shaderProgram) {
      super(gl, shaderProgram);
      this.buffers = initBuffers(gl, shapes.cube);
   }
}

class Surface extends Renderable {
   constructor(gl, shaderProgram) {
      super(gl, shaderProgram);
      this.buffers = initBuffers(gl, shapes.cube);
   }
}

class MarchingCube {
   constructor(gl, shaderProgram) {
      this.glInstance = gl;
      this.shaderProgram = shaderProgram;
      this.buffers = [null];
      this.isInit = false;
   }

   async init(val) {
      return new Promise((resolve, reject) => {
         buildCubeGrid
            .then(({grid, points}) => {
               this.grid = grid;
               this.points = points;
               this.isInit = true;
            })
            .then(() => texHelper.getValues(0))
            .then(vals => updatePointValues(this.points, vals))
            .then(() => march(this.grid, val))
            .then(cubes => this.buffers = cubes.map(buffer => initBuffers(this.glInstance, buffer)))
            .then(() => resolve())
            .catch(err => reject(err))
         ;
      });
   }

   render() {
      for (let i=0; i<this.buffers.length; i++) this.renderCubePart(i);
   }

   renderCubePart(ind) {
      const gl = this.glInstance;
      const buffer = this.buffers[ind];

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertices);
      gl.vertexAttribPointer(
         this.shaderProgram.attribLocations.vertexPosition, 
         3, gl.FLOAT, false, 0, 0,
      );
      gl.enableVertexAttribArray(this.shaderProgram.attribLocations.vertexPosition);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indices);
      gl.drawElements(gl.TRIANGLES, buffer.indexCount, gl.UNSIGNED_SHORT, 0);
   }
}

export default {
   Slice,
   Sphere,
   Surface,
   MarchingCube,
}