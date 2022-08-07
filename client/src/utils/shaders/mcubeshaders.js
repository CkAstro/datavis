const vs = `#version 300 es
   in vec4 aVertexPosition;
   uniform mat4 uProjectionMatrix;
   uniform mat4 uModelViewMatrix;
   uniform vec3 uEyePos;

   out vec3 pos;
   flat out vec3 eyePos;

   void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      pos = aVertexPosition.xyz;
      eyePos = uEyePos;
   }
`;

const fs = `#version 300 es
   precision highp float;

   in vec3 pos;
   flat in vec3 eyePos;

   uniform highp sampler3D modelData;
   uniform highp sampler2D colorMap;

   uniform int uDataIndex;

   out vec4 color;

   // we could create a normal texture for each variable (density, etc)
   // instead we will just sample near position and take a gradient
   vec3 getSurfaceNormal(vec3 pos) {
      vec3 normPos = 0.5*(pos+1.0);    // data ranges -1 to 1, tex ranges 0-1
      vec2 dir = vec2(0.004, 0.0);     // clean math
      float x2 = texture(modelData, normPos+dir.xyy)[uDataIndex];
      float x1 = texture(modelData, normPos-dir.xyy)[uDataIndex];
      float y2 = texture(modelData, normPos+dir.yxy)[uDataIndex];
      float y1 = texture(modelData, normPos-dir.yxy)[uDataIndex];
      float z2 = texture(modelData, normPos+dir.yyx)[uDataIndex];
      float z1 = texture(modelData, normPos-dir.yyx)[uDataIndex];
      return normalize(vec3(x1-x2, y1-y2, z1-z2));
   }

   void main(void) {
      vec3 light = normalize(eyePos);  // head lamp lighting
      float rayLength = length(pos);
      if (rayLength < 0.01 || rayLength > 0.98) discard;
      float val = texture(modelData, 0.5*(pos+1.0))[uDataIndex];
      vec4 clr = texture(colorMap, vec2(val, 0.5));
      vec3 norm = getSurfaceNormal(pos);
      float diffuse = 0.3 + abs(dot(norm, light));
      color = vec4(clr.rgb*diffuse, 1.0);
   }
`;

export default { vs, fs };
