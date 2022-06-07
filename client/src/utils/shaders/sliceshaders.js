const vs = 
`#version 300 es
   in vec4 aVertexPosition;
   uniform vec4 uTranslation;
   uniform mat4 uProjectionMatrix;
   uniform mat4 uModelViewMatrix;
   uniform mat4 uRotation;

   out vec3 pos;

   void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * uRotation * (aVertexPosition + uTranslation);
      pos = (uRotation * (aVertexPosition + uTranslation)).xyz;
   }
`;

const fs = 
`#version 300 es
   precision highp float;

   in vec3 pos;

   uniform highp sampler3D modelData;
   uniform highp sampler2D colorMap;

   uniform int uDataIndex;

   out vec4 color;

   void main(void) {
      float rayLength = length(pos);
      if (rayLength < 0.01 || rayLength > 0.98) discard;
      float val = texture(modelData, 0.5*(pos+1.0))[uDataIndex];
      vec4 clr = texture(colorMap, vec2(val, 0.5));
      color = vec4(clr.rgb, 1.0);
   }
`;

export default { vs, fs };