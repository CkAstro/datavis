import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import GL2Canvas from '../gl2canvas';
import glHelper from '../../utils/glhelper';
import textureHelper from '../../utils/texturehelper';
import buildShaderSuite from '../../utils/shaders/shadersuite';
import './display.css';

const drawScene = (gl, scene, objects, frameRate) => {
   
   if (!textureHelper.isInit) {
      textureHelper.init(gl);
   }
   
   if (!glHelper.isInit) {
      const shaderSuite = buildShaderSuite(gl);
      glHelper.init(gl, shaderSuite);
   }

   glHelper.updateModelViewMatrix(scene.zoom, scene.azi, scene.pol);
   glHelper.renderObjectList(objects, textureHelper.textureList, textureHelper.colorMapList);
}

const Display = () => {
   const { options, handleCamera } = useCamera();
   const { renderables } = useRenderables();

   return (
      <div className='displayArea'>
         <GL2Canvas 
            draw={drawScene} 
            scene={options} 
            objects={renderables} 
            moveCamera={handleCamera}
         />
      </div>
   );
}

export default Display;