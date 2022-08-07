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
         3,
         gl.FLOAT,
         false,
         0,
         0
      );
      gl.enableVertexAttribArray(
         this.shaderProgram.attribLocations.vertexPosition
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
      gl.drawElements(
         gl.TRIANGLES,
         this.buffers.indexCount,
         gl.UNSIGNED_SHORT,
         0
      );
   }
}

export default Renderable;
