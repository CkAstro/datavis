import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import GL2Canvas from '../gl2canvas';
import { getShaderProgram, buildProgramInfo } from '../../utils/shaders';
import glhelper from '../../utils/glhelper';
import './display.css';


const buildShaderSuite = gl => {
   const sliceShader = getShaderProgram(gl, 'Slice');
   const sphereShader = getShaderProgram(gl, 'Sphere');
   const surfaceShader = getShaderProgram(gl, 'Surface');
   const programInfo = {
      sliceShader: {
         program: sliceShader,
         attribs: { vertexPosition: 'aVertexPosition' },
         uniforms: {
            projectionMatrix: 'uProjectionMatrix',
            modelViewMatrix: 'uModelViewMatrix',
            translation: 'uTranslation',
         },
      },
      sphereShader: {
         program: sphereShader,
         attribs: { vertexPosition: 'aVertexPosition' },
         uniforms: {
            projectionMatrix: 'uProjectionMatrix',
            modelViewMatrix: 'uModelViewMatrix',
            translation: 'uTranslation',
            eyePosition: 'uEyePos',
            radius: 'uRadius',
         },
      },
      surfaceShader: {
         program: surfaceShader,
         attribs: { vertexPosition: 'aVertexPosition' },
         uniforms: {
            projectionMatrix: 'uProjectionMatrix',
            modelViewMatrix: 'uModelViewMatrix',
            eyePosition: 'uEyePos',
            dataValue: 'uDataValue',
         },
      },
   }
   return buildProgramInfo(gl, programInfo);
}


const drawScene = (gl, scene, objects, frameRate) => {
   
   if (!glhelper.isInit) {
      const shaderSuite = buildShaderSuite(gl);
      glhelper.init(gl, shaderSuite);
   }

   glhelper.updateModelViewMatrix(scene.zoom, scene.azi, scene.pol);
   glhelper.renderObjectList(objects);
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