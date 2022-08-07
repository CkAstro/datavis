const initBuffers = (gl, shape) => {
   const vertexBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(shape.vertices),
      gl.STATIC_DRAW
   );

   const indexBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
   gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(shape.indices),
      gl.STATIC_DRAW
   );

   return {
      vertices: vertexBuffer,
      indices: indexBuffer,
      indexCount: shape.indices.length,
   };
};

export default initBuffers;
