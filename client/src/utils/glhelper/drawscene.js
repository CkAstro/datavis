import glHelper from './index';
import texHelper from '../texturehelper';
import buildShaderSuite from '../shaders/shadersuite';

const drawScene = (gl, scene, objects, frameRate) => {
   
   if (!texHelper.isInit) texHelper.init(gl);
   if (!glHelper.isInit) {
      const shaderSuite = buildShaderSuite(gl);
      glHelper.init(gl, shaderSuite);
   }

   glHelper.updateModelViewMatrix(scene);
   glHelper.renderObjectList(objects, scene, texHelper.textureList);
}

export default drawScene;