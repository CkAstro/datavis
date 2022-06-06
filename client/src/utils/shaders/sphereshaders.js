const vs = 
`#version 300 es
   in vec4 aVertexPosition;

   uniform vec4 uTranslation;
   uniform mat4 uProjectionMatrix;
   uniform mat4 uModelViewMatrix;
   uniform vec3 uEyePos;

   out vec3 rayDirection;
   flat out vec3 eyePos;
   flat out vec3 origin;

   void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      eyePos = uEyePos;
      origin = uTranslation.xyz;
      rayDirection = aVertexPosition.xyz - uEyePos;
   }
`;

const fs = 
`#version 300 es
   precision highp float;

   uniform mat4 uProjectionMatrix;
   uniform mat4 uModelViewMatrix;

   in vec3 rayDirection;
   flat in vec3 eyePos;
   flat in vec3 origin;

   uniform float uRadius;
   uniform int uDataIndex;

   uniform highp sampler3D modelData;
   uniform highp sampler2D colorMap;

   out vec4 color;

   // solving r^2 = (x-c)^2, where
   // x = o + d*u, 
   // o == camera lense
   // u == unit LoS (rayDir)
   // c == sphere origin
   // so r^2 = dot(o+d*u-c, o+d*u-c)
   // d gives us distance along LoS for sphere 
   // surface, where vec2.x is closest point
   // and vec2.y is farthest point
   vec2 intersectSphere(vec3 o, vec3 u, vec3 c) {
      vec3 oc = o-c;
      float uoc = dot(u, oc);
      float oc2 = dot(oc, oc);
      float inner = dot(      // dot for quick addition
         vec2(uoc, -1.0),
         vec2(uoc, oc2-uRadius*uRadius)
      );
      if (inner < 0.0) return vec2(1.0, 0.0);   // LoS does not intersect
      float width = sqrt(inner);
      return vec2(
         -uoc - width,
         -uoc + width
      );
   }

   // assumes depth = (1/z - 1/near) / (1/far - 1/near)
   // where near = 0.01 and far = 10.0
   // depth == 1/gl_FragCoord.w will always be checked, so we 
   //    return 1/depth to save some cycles
   float getDepth(vec3 coord) {
      vec4 tmp = uProjectionMatrix * uModelViewMatrix * vec4(coord, 1.0);
      return 9.99 / (10.0 - 1.0/tmp.w);
   }

   void main(void) {
      vec3 light = normalize(eyePos);  // head lamp lighting

      // get intersect point
      vec3 rayDir = normalize(rayDirection);
      vec2 sph = intersectSphere(eyePos, rayDir, origin);
      if (sph.x > sph.y) discard;      // no portion of sphere along LoS

      // get texture at sphere surface
      vec3 pos = eyePos + sph.x * rayDir;
      float rayLength = length(pos);

      // a. test near intersect point
      if (rayLength < 0.01 || rayLength > 0.98) {
         // b. if it's out of data grid, try far point
         pos = eyePos + sph.y * rayDir;
         rayLength = length(pos);
      }

      // c. if both are out of grid, toss
      if (rayLength < 0.01 || rayLength > 0.98) discard;

      // d. confirm point is in front of existing pixel
      float depth = getDepth(pos);
      if (depth < gl_FragCoord.w) discard;   // true depth is 1.0/gl_FragCoord.w
      gl_FragDepth = 1.0/depth;  

      // now that we know we want to draw, get pixel color
      float val = texture(modelData, 0.5*(pos+1.0))[uDataIndex];
      vec4 clr = texture(colorMap, vec2(val, 0.5));
      vec3 norm = normalize(pos-origin);
      float diffuse = 0.3 + abs(dot(norm, light));
      color = vec4(clr.rgb*diffuse, 1.0);
   }
`;

export default { vs, fs };