import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import GL2Canvas from '../gl2canvas';
import { getShaderProgram, buildProgramInfo } from '../../utils/shaders';
import glHelper from '../../utils/glhelper';
import textureHelper from '../../utils/texturehelper';
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
            modelData: 'modelData',
            colorMap: 'colorMap',
            dataIndex: 'uDataIndex',
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
            modelData: 'modelData',
            colorMap: 'colorMap',
            dataIndex: 'uDataIndex',
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
            modelData: 'modelData',
            colorMap: 'colorMap',
            dataIndex: 'uDataIndex',
         },
      },
   }
   return buildProgramInfo(gl, programInfo);
}

let texList = null;

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