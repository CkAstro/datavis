import { getImageData } from 'api';
import { MCUBE_SIZE } from 'config';
import loadImageData from './loadtexture';

class TextureHelper {
   constructor() {
      this.data = [];
      this.cmaps = [];
      this.glInstance = null;
      this.isInit = false;
   }

   init(gl) {
      this.glInstance = gl;

      const default_data = 'default_data.png';
      const default_cmap = 'default_cmap.png';

      return new Promise((resolve, reject) => {
         // load cmap
         getImageData(default_cmap)
            .then(data => this.loadCmapFromData(data, default_cmap))
            .catch(err => reject(err))
         ;
         
         // load data
         getImageData(default_data)
            .then(data => this.loadTextureFromData(data, default_data))
            .then(() => resolve())
            .catch(err => reject(err))
         ;
      });
   }

   loadTextureFromData(data, texId) {
      return new Promise((resolve, reject) => {
         const { texture, values } = loadImageData(this.glInstance, data);
         this.data = this.data.concat({texture, texId, values});
         setTimeout(() => resolve(values[600]), 1000);
      });
   }

   loadCmapFromData(data, texId) {
      const texture = this.loadImageData2D(data);
      this.cmaps = this.cmaps.concat({texture, texId, data});
   }

   loadImageData2D(imageData) {
      const gl = this.glInstance;
      const texture = gl.createTexture();

      const image = new Image;
      image.onload = () => {
         gl.bindTexture(gl.TEXTURE_2D, texture);
         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
      image.src = URL.createObjectURL(imageData);
      return texture;
   }

   getValues(ind) {
      return this.data[ind].values;
   }

   getVolRes(image) {
      let volRes;
      if (image.width === image.height) {
         const guess = image.width**(2./3.);
         if (Math.abs(guess - Math.round(guess)) < 0.01) volRes = Math.round(guess);
      }
      if (!volRes) throw new Error('non-pow(2)**3 image dimensions not yet accounted for');
      return volRes;
   }

   init3DTexture(gl, texture, volRes) {
      gl.bindTexture(gl.TEXTURE_3D, texture);
      gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RGB32F, volRes, volRes, volRes);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
   }

   loadImageData3D(imageData) {
      const gl = this.glInstance;
      const texture = gl.createTexture();
      const values = new Float32Array(MCUBE_SIZE*MCUBE_SIZE*MCUBE_SIZE);

      const image = new Image;
      image.onload = () => {
         const canvas = document.createElement('canvas');
         canvas.width = image.width;
         canvas.height = image.height;
         const ctx = canvas.getContext('2d');
         ctx.drawImage(image, 0, 0);

         const volRes = this.getVolRes(image);
         const valStep = Math.floor(volRes/MCUBE_SIZE);
         this.init3DTexture(gl, texture, volRes);

         let sliceCount = Math.floor(volRes**0.5);
         if (volRes%sliceCount) sliceCount++;

         let pos = 0;
         const dataBuffer = new Float32Array(3*volRes*volRes);
         for (let k=0; k<volRes; k++) {
            const sliceX = k % sliceCount;
            const sliceY = Math.floor(k/sliceCount);
            const img = ctx.getImageData(sliceX*volRes, sliceY*volRes, volRes, volRes);

            for (let j=0; j<volRes; j++) {
               for (let i=0; i<volRes; i++) {
                  for (let n=0; n<3; n++) {
                     dataBuffer[3*(j*volRes+i)+n] = img.data[4*(j*volRes+i)+n] / 255.0;   // should range 0-1
                  }
                  if (!i%valStep && !j%valStep && !k%valStep) {
                     values[pos] = img.data[4*(j*volRes+i)] / 255.0;
                     pos++;
                  }
               }
            }
            gl.texSubImage3D(gl.TEXTURE_3D, 0, 0, 0, k, volRes, volRes, 1, gl.RGB, gl.FLOAT, dataBuffer);
         }
      }
      image.src = URL.createObjectURL(imageData);
      return { texture, values };
   }
}

export default new TextureHelper;