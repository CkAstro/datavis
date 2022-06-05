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
      color = vec4(0.0, 1.0, 1.0, 1.0);
   }
`;

export default { vs, fs };