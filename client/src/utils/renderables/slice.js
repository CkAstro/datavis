import Renderable from './renderable';
import initBuffers from './initbuffers';
import shapes from './shapes';

class Slice extends Renderable {
   constructor(gl, shaderProgram) {
      super(gl, shaderProgram);
      this.buffers = initBuffers(gl, shapes.square);
   }
}

export default Slice;
