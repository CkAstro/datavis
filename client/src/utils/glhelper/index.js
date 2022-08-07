import Renderables from 'utils/renderables';
import {
   clearCanvas,
   enableViewport,
   getProjectionMatrix,
   getModelViewMatrix,
   getEyePosition,
} from './scenesetup';
import {
   enableShader,
   setObjectUniforms,
   setDataTexture,
   setCmapTexture,
   setProjectionMatrix,
   setModelViewMatrix,
} from './objectsetup';

class GLHelper {
   constructor() {
      this.isInit = false;
      this.glInstance = null;
      this.shaderSuite = null;
   }

   async init(gl, shaderSuite) {
      this.glInstance = gl;
      this.shaderSuite = shaderSuite;

      this.slice = new Renderables.Slice(gl, shaderSuite.sliceShader);
      this.sphere = new Renderables.Sphere(gl, shaderSuite.sphereShader);
      this.surface = new Renderables.Surface(gl, shaderSuite.surfaceShader);
      this.mcube = new Renderables.MarchingCube(gl, shaderSuite.mcubeShader);

      this.isInit = true;
      return Promise.resolve();
   }

   // temporary method before we fully implement marching cubes
   async initMCube(texHelper) {
      return Promise.resolve().then(() => this.mcube.init(texHelper, 0.2));
   }

   renderObjects(objects, scene, data, cmap) {
      const gl = this.glInstance;

      clearCanvas(gl);
      const projectionMatrix = getProjectionMatrix(gl, scene.compare);

      for (let viewport = 0; viewport < 2; viewport++) {
         if (viewport === 1 && !scene.compare) return; // exit if viewport isn't active

         enableViewport(gl, viewport, scene.compare);
         const modelViewMatrix = getModelViewMatrix(viewport, scene);
         const eyePosition = getEyePosition(modelViewMatrix);

         objects.forEach((obj) => {
            if (!obj.isVisible[viewport]) return; // only draw visible objects

            const shader = enableShader(gl, obj.type, this.shaderSuite);
            setProjectionMatrix(gl, shader, projectionMatrix);
            setModelViewMatrix(gl, shader, modelViewMatrix);
            setDataTexture(gl, shader, data);
            setCmapTexture(gl, shader, cmap);
            setObjectUniforms(gl, shader, obj, eyePosition);

            this[obj.renderer].render();
         });
      }
   }
}

export default new GLHelper();
