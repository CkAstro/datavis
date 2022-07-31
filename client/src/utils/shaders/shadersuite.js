import { getShaderProgram, buildProgramInfo } from './index';

const buildShaderSuite = async gl => {
   const sliceShader = getShaderProgram(gl, 'Slice');
   const sphereShader = getShaderProgram(gl, 'Sphere');
   const surfaceShader = getShaderProgram(gl, 'Surface');
   const mcubeShader = getShaderProgram(gl, 'MCube');
   const programInfo = {
      sliceShader: {
         program: sliceShader,
         attribs: { vertexPosition: 'aVertexPosition' },
         uniforms: {
            projectionMatrix: 'uProjectionMatrix',
            modelViewMatrix: 'uModelViewMatrix',
            translation: 'uTranslation',
            rotation: 'uRotation',
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
            dataValue: 'uValue',
            modelData: 'modelData',
            colorMap: 'colorMap',
            dataIndex: 'uDataIndex',
         },
      },
      mcubeShader: {
         program: mcubeShader,
         attribs: { vertexPosition: 'aVertexPosition' },
         uniforms: {
            projectionMatrix: 'uProjectionMatrix',
            modelViewMatrix: 'uModelViewMatrix',
            modelData: 'modelData',
            colorMap: 'colorMap',
            dataIndex: 'uDataIndex',
         },
      }
   }
   
   const shaderSuite = buildProgramInfo(gl, programInfo)
   return Promise.resolve(shaderSuite);
}

export default buildShaderSuite;