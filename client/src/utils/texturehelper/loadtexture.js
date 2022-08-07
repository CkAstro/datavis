import { MCUBE_SIZE } from 'config';

const getVolRes = (image) => {
   const { width, height } = image;
   if (width === height) {
      const guess = image.width ** (2 / 3);
      if (Math.abs(guess - Math.round(guess)) < 0.01) return Math.round(guess);
   }
   throw new Error('non-pow(2)**3 image dimensions not yet accounted for');
};

const init3DTexture = (gl, texture, volRes) => {
   gl.bindTexture(gl.TEXTURE_3D, texture);
   gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RGB32F, volRes, volRes, volRes);
   gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
   gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
   gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
   gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
};

const loadImageData = (gl, imageData) => {
   const texture = gl.createTexture();
   const values = new Array(MCUBE_SIZE * MCUBE_SIZE * MCUBE_SIZE);

   const image = new Image();
   image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      const volRes = getVolRes(image);
      const valStep = Math.floor(volRes / MCUBE_SIZE);
      init3DTexture(gl, texture, volRes);

      let sliceCount = Math.floor(volRes ** 0.5);
      if (volRes % sliceCount) sliceCount++;
      const dataBuffer = new Float32Array(3 * volRes * volRes);

      let pos = 0;
      for (let k = 0; k < volRes; k++) {
         const sliceX = k % sliceCount;
         const sliceY = Math.floor(k / sliceCount);
         const img = ctx.getImageData(
            sliceX * volRes,
            sliceY * volRes,
            volRes,
            volRes
         );

         for (let j = 0; j < volRes; j++) {
            for (let i = 0; i < volRes; i++) {
               for (let n = 0; n < 3; n++) {
                  dataBuffer[3 * (j * volRes + i) + n] =
                     img.data[4 * (j * volRes + i) + n] / 255.0; // should range 0-1
               }
               if (
                  i % valStep === 0 &&
                  j % valStep === 0 &&
                  k % valStep === 0
               ) {
                  values[pos] = img.data[4 * (j * volRes + i)] / 255.0;
                  pos++;
               }
            }
         }
         gl.texSubImage3D(
            gl.TEXTURE_3D,
            0,
            0,
            0,
            k,
            volRes,
            volRes,
            1,
            gl.RGB,
            gl.FLOAT,
            dataBuffer
         );
      }
   };

   image.src = URL.createObjectURL(imageData);
   return { texture, values };
};

export default loadImageData;
