import { mat4 } from "gl-matrix";
import { Renderables } from "../renderables";

class GLHelper {
   constructor() {
      this.isInit = false;
      this.glInstance = null;
      this.shaderSuite = null;
      this.projectionMatrix = null;
      this.modelViewMatrix = null;
      this.eyePosition = null;

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

   enableShader(type) {
      let shader;
      if (type === 'slice') {
         shader = this.shaderSuite.sliceShader;
      } else if (type === 'sphere') {
         shader = this.shaderSuite.sphereShader;
      } else if (type === 'surface') {
         shader = this.shaderSuite.surfaceShader;
      } else {
         throw new Error('object type not recognized');
      }
      this.glInstance.useProgram(shader.program);
      return shader;
   }

   getModelViewMatrix(camera) {
      
      const azimuthal = 2.0 * Math.PI * camera.azi / 600.0;
      const polar = 2.0 * Math.PI * camera.pol / 500.0;

      this.modelViewMatrix = mat4.create();
      mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [0.0, 0.0, camera.zoom]);
      mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, azimuthal, [0.0, 1.0, 0.0]);
      mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, polar, [Math.cos(azimuthal), 0.0, Math.sin(azimuthal)]);

      const invertedView = mat4.invert(mat4.create(), this.modelViewMatrix);
      this.eyePosition = [
         invertedView[12],
         invertedView[13],
         invertedView[14],
      ];
   }

   enableViewport(window, compare) {
      const gl = this.glInstance;

      if (!compare) return gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      if (window === 0) return gl.viewport(0, 0, gl.canvas.width/2.0, gl.canvas.height);
      return gl.viewport(gl.canvas.width/2.0, 0, gl.canvas.width/2.0, gl.canvas.height);
   }

   renderObjectList(objects, scene, tex) {
      const gl = this.glInstance;

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clearDepth(1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST); 
      gl.depthFunc(gl.LEQUAL);

      for (let window=0; window<2; window++) {
         if (window === 1 && !scene.compare) break;

         // enable viewport
         this.enableViewport(window, scene.compare);

         for (const obj of objects) {
            if (!obj.isVisible[window]) continue;  // only draw visible objects

            // enable correct shader
            const shader = this.enableShader(obj.type);

            // enable global matrices
            const camera = scene.linked ? scene.camera[0] : scene.camera[window];
            this.getModelViewMatrix(camera);
            // this.getModelViewMatrix(scene.camera[scene.linked ? 0 : window]);
            gl.uniformMatrix4fv(shader.uniformLocations.projectionMatrix, false, this.projectionMatrix);
            gl.uniformMatrix4fv(shader.uniformLocations.modelViewMatrix, false, this.modelViewMatrix);
            gl.uniform1i(shader.uniformLocations.dataIndex, obj.activeVarIndex);

            // enable data texture
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_3D, tex.textures[0]);
            gl.uniform1i(shader.uniformLocations.modelData, 0);

            // enable color map
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, tex.colormaps[0]);
            gl.uniform1i(shader.uniformLocations.colorMap, 1);

            // enable type-dependent uniforms
            const sliderVals = obj.sliderList.map(slider => slider.trueValue);
            if (obj.type === 'slice') {
               const translation = [sliderVals[0], 0.0, 0.0, 0.0];
               gl.uniform4fv(shader.uniformLocations.translation, translation);
            } else if (obj.type === 'sphere') {
               const translation = [sliderVals[0], sliderVals[1], sliderVals[2], 0.0];
               const radius = sliderVals[3];

               gl.uniform4fv(shader.uniformLocations.translation, translation);
               gl.uniform1f(shader.uniformLocations.radius, radius);
               gl.uniform3fv(shader.uniformLocations.eyePosition, this.eyePosition);
            } else if (obj.type === 'surface') {
               const dataValue = sliderVals[0];

               gl.uniform1f(shader.uniformLocations.dataValue, dataValue);
               gl.uniform3fv(shader.uniformLocations.eyePosition, this.eyePosition);
            } else {
               throw new Error('object type not recognized');
            }

            // render object
            this[obj.type].render();
         }
      }
   }
}

export default new GLHelper;