const vs = 
`#version 300 es
   in vec4 aVertexPosition;
   uniform mat4 uProjectionMatrix;
   uniform mat4 uModelViewMatrix;
   uniform vec3 uEyePos;

   out vec3 rayDirection;
   flat out vec3 eyePos;

   void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      eyePos = uEyePos;
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

   uniform float uValue;
   // uniform int uDataIndex;

   uniform highp sampler3D modelData;
   uniform highp sampler2D colorMap;

   out vec4 color;

   // solving r^2 = (x-c)^2, where
   // x = o + d*u, 
   // o == camera lense
   // u == unit LoS (rayDir)
   // c == sphere origin
   // d gives us distance along LoS for sphere 
   // surface, where vec2.x is closest point
   // and vec2.y is farthest point
   vec2 intersectSphere(vec3 o, vec3 u) {
      float uo = dot(u, o);
      float oo = dot(o, o);
      float inner = dot(
         vec2(uo, -1.0),
         vec2(uo, oo-0.98*0.98)     // r = 0.98; higher outside data block
      );
      if (inner < 0.0) return vec2(1.0, 0.0);
      float width = sqrt(inner);
      return vec2(
         -uo - width,
         -uo + width
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

   // we could create a normal texture for each variable (density, etc)
   // instead we will just sample near position and take a gradient
   vec3 getSurfaceNormal(vec3 pos) {
      int uDataIndex = 0;
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

      // get intersection point
      vec3 rayDir = normalize(rayDirection);
      vec2 sph = intersectSphere(eyePos, rayDir);
      if (sph.x > sph.y) discard;      // outside of data block

      float del = 0.0039;     // TODO: adjust to volume resolution
      vec3 delRay = del * rayDir;

      // move along LoS until we hit uValue;
      vec3 pos = eyePos + sph.x * rayDir;
      float lastVal = texture(modelData, 0.5*(pos+1.0))[0];

      bool surface = false;      // this is required to fix rendering bug 
                                 // on Windows; we must break to exterior
                                 // IF-statement to set gl_FragDepth
      for (float l=sph.x; l<sph.y; l+=del) {
         float thisVal = texture(modelData, 0.5*(pos+1.0))[0];

         if ((lastVal < uValue && thisVal >= uValue) || (lastVal > uValue && thisVal <= uValue)) {
            pos += (uValue-thisVal) / (thisVal-lastVal) * delRay; // interpolate position
            surface = true;
            break;
         }
         lastVal = thisVal;
         pos += delRay;
      }

      if (surface) {
         float depth = getDepth(pos);
         if (depth < gl_FragCoord.w) discard;
         gl_FragDepth = 1.0/depth;              // update depth buffer

         // color based on value for now
         vec4 clr = texture(colorMap, vec2(uValue, 0.5));
         vec3 norm = getSurfaceNormal(pos);
         float diffuse = 0.3 + abs(dot(norm, light));
         color = vec4(clr.rgb*diffuse, 1.0);
      } else {
         discard;
      }
   }
`;

export default { vs, fs };