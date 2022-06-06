
const loadTextureFromImage = (gl, url) => {
   const VolRes = 256;
   let textures = new Array(3);

   const di = 4;
   const dj = 4*VolRes;
   const dk = 4*VolRes*VolRes;

   const image = new Image;
   image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      let sliceCount = Math.floor(VolRes**0.5);
      if (VolRes % sliceCount) sliceCount++;

      for (let channel=0; channel<3; channel++) {
         const tex = gl.createTexture();
         gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RGBA32F, VolRes, VolRes, VolRes);
         gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
         gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

         // loop through image and fill texture
         const dataBuffer = new Float32Array(4*VolRes**3);
         for (let k=0; k<VolRes; k++) {
            let sliceX = k % sliceCount;
            let sliceY = Math.floor(k/sliceCount);
            let img = ctx.getImageData(sliceX*VolRes, sliceY*VolRes, VolRes, VolRes);

            for (let j=0; j<VolRes; j++) {
               for (let i=0; i<VolRes; i++) {
                  const val = img.data[4*(j*VolRes+i)+channel] / 255.0;
                  const loc = k*dk + j*dj + i*di;

                  dataBuffer[loc] = val;

                  // set up gradient
                  if (i > 0) dataBuffer[loc-di+1] -= val;
                  if (i < VolRes-1) dataBuffer[loc+di+1] += val;
                  if (j > 0) dataBuffer[loc-dj+2] -= val;
                  if (j < VolRes-1) dataBuffer[loc+dj+2] += val;
                  if (k > 0) dataBuffer[loc-dk+3] -= val;
                  if (k < VolRes-1) dataBuffer[loc+dk+3] += val;
               }
            }
         }

         gl.texSubImage3D(gl.TEXTURE_3D, 0, 0, 0, 0, VolRes, VolRes, VolRes, gl.RGBA, gl.FLOAT, dataBuffer);
         textures[channel] = tex;
      }
   }
   image.src = url;
   return textures;
}

export {
   loadTextureFromImage,
}