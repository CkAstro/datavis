import { mat4 } from 'gl-matrix';

// globals for 'getProjectionMatrix'
const _viewingAngle = 45.0 * Math.PI/180;      // radians
const _zNear = 0.1;
const _zFar = 100.0;

// globals for 'getModelViewMatrix'
const _aziScale = 2 * Math.PI / 600;
const _polScale = 2 * Math.PI / 500;

const clearCanvas = gl => {
   gl.clearColor(0.0, 0.0, 0.0, 0.0);
   gl.clearDepth(1.0);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   gl.enable(gl.DEPTH_TEST); 
   gl.depthFunc(gl.LEQUAL);
}

const enableViewport = (gl, viewport, compare) => {
   const { width, height } = gl.canvas;

   // full window if we only have one viewport
   if (!compare) return gl.viewport(0, 0, width, height);

   // otherwise offset second viewport
   const offset = viewport === 0 ? 0 : width / 2;
   return gl.viewport(offset, 0, width/2, height);
}

const getProjectionMatrix = (gl, compare) => {
   const { width, height } = gl.canvas.getBoundingClientRect();

   // update if we've resized
   gl.canvas.width = width;
   gl.canvas.height = height;
   const aspect = compare ? width / 2 / height : width / height;

   // return projection matrix
   return mat4.perspective(
      mat4.create(),
      _viewingAngle,
      aspect,
      _zNear,
      _zFar,
   );
}

const getModelViewMatrix = (viewport, scene) => {
   const camera = scene.linked ? scene.camera[0] : scene.camera[viewport];
   const azi = camera.azi * _aziScale;
   const pol = camera.pol * _polScale;

   const modelViewMatrix = mat4.create();
   mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, camera.zoom]);
   mat4.rotate(modelViewMatrix, modelViewMatrix, azi, [0, 1, 0]);
   mat4.rotate(modelViewMatrix, modelViewMatrix, pol, [Math.cos(azi), 0, Math.sin(azi)]);

   return modelViewMatrix;
}

const getEyePosition = modelViewMatrix => {
   const invertedView = mat4.invert(mat4.create(), modelViewMatrix);
   return invertedView.slice(12, 15);  // camera eye is first three of bottom row of inverted
}

export {
   clearCanvas,
   enableViewport,
   getProjectionMatrix,
   getModelViewMatrix,
   getEyePosition,
}