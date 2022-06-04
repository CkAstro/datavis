import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import GL2Canvas from '../canvas';
import './display.css';

import { mat4 } from 'gl-matrix';


const Square = {
   vertices: [
      0.0, -1.0, -1.0,    // x
      0.0,  1.0, -1.0,
      0.0,  1.0,  1.0,
      0.0, -1.0,  1.0,
   ],
   // vertices: [
   //    -1.0, 0.0, -1.0,    // y
   //     1.0, 0.0, -1.0,
   //     1.0, 0.0,  1.0,
   //    -1.0, 0.0,  1.0,
   // ],
   indices: [
      0,  1,  2,     0,  2,  3,    // front
   ],
}


const Cube = {
   vertices: [
      -1.0, -1.0,  1.0,    // front
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0, -1.0, -1.0,    // back
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,    // top
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,
      -1.0, -1.0, -1.0,    // bottom
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,
       1.0, -1.0, -1.0,    // right
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0, -1.0,    // left
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0,
   ],
   indices: [
      0,  1,  2,     0,  2,  3,    // front
      4,  5,  6,     4,  6,  7,    // back
      8,  9,  10,    8,  10, 11,   // top
      12, 13, 14,    12, 14, 15,   // bottom
      16, 17, 18,    16, 18, 19,   // right
      20, 21, 22,    20, 22, 23,   // left
   ],
}

const vs = 
`#version 300 es
   in vec4 aVertexPosition;
   uniform mat4 uProjectionMatrix;
   uniform mat4 uModelViewMatrix;

   void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
   }
`;

const fs = 
`#version 300 es
   precision highp float;

   out vec4 color;

   void main(void) {
      color = vec4(1.0, 1.0, 1.0, 1.0);
   }
`;

let _shaderProgram = null;

const loadShader = (gl, type, source) => {
   const shader = gl.createShader(type);
   gl.shaderSource(shader, source);
   gl.compileShader(shader);

   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('could not compile webgl shader; webgl cannot run.');
      gl.deleteShader(shader);
      return null;
   }
   return shader;
}

const initShaderProgram = gl => {
   const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs);
   const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);

   const shaderProgram = gl.createProgram();
   gl.attachShader(shaderProgram, vertexShader);
   gl.attachShader(shaderProgram, fragmentShader);
   gl.linkProgram(shaderProgram);

   if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Could not initialize WebGL shader program; WebGL cannot run.');
      return null;
   }
   return shaderProgram;
}

let _buffers = null;
const initBuffers = gl => {
   const vertexBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Square.vertices), gl.STATIC_DRAW);

   const indexBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Square.indices), gl.STATIC_DRAW)
   return {
      vertices: vertexBuffer, 
      indices: indexBuffer,
   }
}

const drawScene = (gl, scene, objects, frameRate) => {
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
   gl.clearDepth(1.0);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   gl.enable(gl.DEPTH_TEST); 
   gl.depthFunc(gl.LEQUAL);

   const projectionMatrix = mat4.create();
   mat4.perspective(
      projectionMatrix,
      45.0 * Math.PI / 180.0,
      6.0 / 5.0,
      0.1,
      100.0,
   );

   const modelViewMatrix = mat4.create();
   mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -6.0]);
   mat4.rotate(modelViewMatrix, modelViewMatrix, Math.PI/4.0, [0.0, 1.0, 1.0]);

   if (!_shaderProgram) _shaderProgram = initShaderProgram(gl);
   const programInfo = {
      program: _shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(_shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(_shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(_shaderProgram, 'uModelViewMatrix'),
      },
   };

   gl.useProgram(programInfo.program); 
   gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix,
   );
   gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix,
   );

   if (!_buffers) _buffers = initBuffers(gl);
   gl.bindBuffer(gl.ARRAY_BUFFER, _buffers.vertices);
   gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _buffers.indices);
   gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
}

const Display = () => {
   const { options } = useCamera();
   const { renderables } = useRenderables();

   return (
      <div className='displayArea'>
         <GL2Canvas draw={drawScene} scene={options} objects={renderables}/>
      </div>
   );
}

export default Display;