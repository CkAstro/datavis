import { getImageData } from '@/api';
import loadImageData from './loadtexture';

class TextureHelper {
   constructor() {
      this.data = [];
      this.cmaps = [];
      this.glInstance = null;
   }

   init(gl) {
      this.glInstance = gl;

      const defaultData = 'default_data.png';
      const defaultCmap = 'default_cmap.png';

      return new Promise((resolve, reject) => {
         getImageData(defaultCmap)
            .then((data) => this.loadCmapFromData(data, defaultCmap))
            .then(() => getImageData(defaultData))
            .then((data) => this.loadTextureFromData(data, defaultData))
            .then(() => resolve())
            .catch((err) => reject(err));
      });
   }

   loadTextureFromData(data, texId) {
      return new Promise((resolve) => {
         const { texture, values } = loadImageData(this.glInstance, data);
         this.data = this.data.concat({ texture, texId, values });
         setTimeout(() => resolve(), 500);
      });
   }

   loadCmapFromData(data, texId) {
      const texture = this.loadImageData2D(data);
      this.cmaps = this.cmaps.concat({ texture, texId, data });
   }

   loadImageData2D(imageData) {
      const gl = this.glInstance;
      const texture = gl.createTexture();

      const image = new Image();
      image.onload = () => {
         gl.bindTexture(gl.TEXTURE_2D, texture);
         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      };
      image.src = URL.createObjectURL(imageData);
      return texture;
   }

   getValues(ind) {
      return this.data[ind].values;
   }
}

export default new TextureHelper();
