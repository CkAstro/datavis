import Slice from './sliceshaders';
import Sphere from './sphereshaders';
import Surface from './surfaceshaders';
import MCube from './mcubeshaders';

const loadShader = (gl, type, source) => {
   const shader = gl.createShader(type);
   gl.shaderSource(shader, source);
   gl.compileShader(shader);

   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('could not compile webgl shader; webgl cannot run.');
      gl.deleteShader(shader);
      return null;
   }
   return shader;
};

const initShaderProgram = (gl, shaderType) => {
   const vertexShader = loadShader(gl, gl.VERTEX_SHADER, shaderType.vs);
   const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, shaderType.fs);

   const shaderProgram = gl.createProgram();
   gl.attachShader(shaderProgram, vertexShader);
   gl.attachShader(shaderProgram, fragmentShader);
   gl.linkProgram(shaderProgram);

   if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Could not initialize WebGL shader program; WebGL cannot run.');
      return null;
   }
   return shaderProgram;
};

const getShaderProgram = (gl, type) => {
   if (type === 'Slice' || type === 'slice')
      return initShaderProgram(gl, Slice);
   if (type === 'Sphere' || type === 'sphere')
      return initShaderProgram(gl, Sphere);
   if (type === 'Surface' || type === 'surface')
      return initShaderProgram(gl, Surface);
   if (type === 'MCube' || type === 'mcube')
      return initShaderProgram(gl, MCube);
   throw new Error(`initShader called using unrecognized shader type ${type}`);
};

const buildProgramInfo = (gl, info, programInfo = null) => {
   const updatedProgramInfo = programInfo ? { ...programInfo } : {};
   Object.keys(info).forEach((shader) => {
      const { program } = info[shader];
      const shaderAttribs = info[shader].attribs;
      const shaderUniforms = info[shader].uniforms;

      const attribs = {};
      Object.keys(shaderAttribs).forEach((attrib) => {
         attribs[attrib] = gl.getAttribLocation(program, shaderAttribs[attrib]);
      });

      const uniforms = {};
      Object.keys(shaderUniforms).forEach((uniform) => {
         uniforms[uniform] = gl.getUniformLocation(
            program,
            shaderUniforms[uniform]
         );
      });

      updatedProgramInfo[shader] = {
         program,
         attribLocations: attribs,
         uniformLocations: uniforms,
      };
   });
   return updatedProgramInfo;
};

export { getShaderProgram, buildProgramInfo };
