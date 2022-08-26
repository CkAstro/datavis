import { mat4 } from 'gl-matrix';

const enableShader = (gl, type, shaderSuite) => {
   let shader;
   if (type === 'xslice' || type === 'yslice' || type === 'zslice') {
      shader = shaderSuite.sliceShader;
   } else if (type === 'sphere') {
      shader = shaderSuite.sphereShader;
   } else if (type === 'surface') {
      shader = shaderSuite.surfaceShader;
   } else if (type === 'mcube') {
      shader = shaderSuite.mcubeShader;
   } else {
      throw new Error('object type not recognized');
   }
   gl.useProgram(shader.program);
   return shader;
};

const setObjectUniforms = (gl, shader, obj, eyePosition) => {
   const sliderVals = obj.sliderList.map((slider) => slider.trueValue);

   gl.uniform1i(shader.uniformLocations.dataIndex, obj.activeVarIndex);
   gl.uniform3fv(shader.uniformLocations.eyePosition, eyePosition);
   gl.uniform1i(shader.uniformLocations.dataIndex, obj.activeVarIndex);

   if (obj.type === 'xslice' || obj.type === 'yslice' || obj.type === 'zslice') {
      const translation = [sliderVals[0], 0, 0, 0];
      const rotation = mat4.create(); // already correct for 'xslice'
      if (obj.type === 'yslice') mat4.rotate(rotation, rotation, Math.PI / 2, [0, 0, 1]);
      if (obj.type === 'zslice') mat4.rotate(rotation, rotation, -Math.PI / 2, [0, 1, 0]);

      gl.uniform4fv(shader.uniformLocations.translation, translation);
      gl.uniformMatrix4fv(shader.uniformLocations.rotation, false, rotation);
   } else if (obj.type === 'sphere') {
      const translation = [sliderVals[0], sliderVals[1], sliderVals[2], 0];
      const radius = sliderVals[3];

      gl.uniform4fv(shader.uniformLocations.translation, translation);
      gl.uniform1f(shader.uniformLocations.radius, radius);
   } else if (obj.type === 'surface' || obj.type === 'mcube') {
      const dataValue = sliderVals[0];

      gl.uniform1f(shader.uniformLocations.dataValue, dataValue);
   } else {
      throw new Error('object type not recognized');
   }
};

const setDataTexture = (gl, shader, data) => {
   gl.activeTexture(gl.TEXTURE0);
   gl.bindTexture(gl.TEXTURE_3D, data);
   gl.uniform1i(shader.uniformLocations.modelData, 0);
};

const setCmapTexture = (gl, shader, cmap) => {
   gl.activeTexture(gl.TEXTURE1);
   gl.bindTexture(gl.TEXTURE_2D, cmap);
   gl.uniform1i(shader.uniformLocations.colorMap, 1);
};

const setProjectionMatrix = (gl, shader, projectionMatrix) => {
   gl.uniformMatrix4fv(shader.uniformLocations.projectionMatrix, false, projectionMatrix);
};

const setModelViewMatrix = (gl, shader, modelViewMatrix) => {
   gl.uniformMatrix4fv(shader.uniformLocations.modelViewMatrix, false, modelViewMatrix);
};

export {
   enableShader,
   setObjectUniforms,
   setDataTexture,
   setCmapTexture,
   setProjectionMatrix,
   setModelViewMatrix,
};
