const vs = 
`#version 300 es
   in vec4 aVertexPosition;
   uniform vec4 uTranslation;
   uniform mat4 uProjectionMatrix;
   uniform mat4 uModelViewMatrix;

   out vec3 pos;

   void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * (aVertexPosition + uTranslation);
      pos = (aVertexPosition + uTranslation).xyz;
   }
`;

const fs = 
`#version 300 es
   precision highp float;

   in vec3 pos;

   out vec4 color;

   void main(void) {
      float rayLength = length(pos);
      if (rayLength < 0.01 || rayLength > 0.98) discard;
      color = vec4(1.0, 1.0, 1.0, 1.0);
   }
`;

export default { vs, fs };