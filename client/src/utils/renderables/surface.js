import Renderable from './renderable';
import initBuffers from './initbuffers';
import shapes from './shapes';

class Surface extends Renderable {
   constructor(gl, shaderProgram) {
      super(gl, shaderProgram);
      this.buffers = initBuffers(gl, shapes.cube);
   }
}

export default Surface;
