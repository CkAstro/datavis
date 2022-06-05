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

export const Renderables = {
   Slice,
   Sphere,
   Surface,
}