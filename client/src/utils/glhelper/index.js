import { mat4 } from "gl-matrix";
import { Renderables } from "../renderables";

class GLHelper {
   constructor() {
      this.isInit = false;
      this.glInstance = null;
      this.shaderSuite = null;
      this.projectionMatrix = null;
      this.modelViewMatrix = null;

      this.zoom = null;
      this.azi = null;
      this.pol = null;

      this.viewingAngle = 45.0;
      this.zNear = 0.1;
      this.zFar = 100.0;
   }

   init(gl, shaderSuite) {
      this.glInstance = gl;
      this.shaderSuite = shaderSuite;
      this.projectionMatrix = this.createProjectionMatrix();
      this.modelViewMatrix = mat4.create();

      this.slice = new Renderables.Slice(gl, shaderSuite.sliceShader);
      this.sphere = new Renderables.Sphere(gl, shaderSuite.sphereShader);
      this.surface = new Renderables.Surface(gl, shaderSuite.surfaceShader);

      this.isInit = true;
   }

   createProjectionMatrix() {
      return mat4.perspective(
         mat4.create(),
         this.viewingAngle * Math.PI / 180.0,
         this.glInstance.canvas.width / this.glInstance.canvas.height,
         this.zNear,
         this.zFar,
      );
   }

   updateModelViewMatrix(zoom, azi, pol) {
      if (this.zoom === zoom && this.azi === azi && this.pol === pol) return;
      this.zoom = zoom;
      this.azi = azi;
      this.pol = pol;
      
      const azimuthal = 2.0 * Math.PI * azi / 600.0;
      const polar = 2.0 * Math.PI * pol / 500.0;

      this.modelViewMatrix = mat4.create();
      mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [0.0, 0.0, zoom]);
      mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, azimuthal, [0.0, 1.0, 0.0]);
      mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, polar, [Math.cos(azimuthal), 0.0, Math.sin(azimuthal)]);
   }

   renderObjectList(objects) {
      const gl = this.glInstance;

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clearDepth(1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST); 
      gl.depthFunc(gl.LEQUAL);

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      for (const obj of objects) {
         const shader = this.shaderSuite.sliceShader;
         gl.useProgram(shader.program);
         gl.uniformMatrix4fv(shader.uniformLocations.projectionMatrix, false, this.projectionMatrix);
         gl.uniformMatrix4fv(shader.uniformLocations.modelViewMatrix, false, this.modelViewMatrix);

         this[obj.type].render();
      }
   }
}




export default new GLHelper;