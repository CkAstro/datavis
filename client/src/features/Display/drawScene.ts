/* eslint-disable @typescript-eslint/naming-convention */
import type { CameraOptions, Renderable, TextureHelper, GLHelper } from '@/types';
import { buildShaderSuite } from '@/utils';

let _lastScene: CameraOptions | null = null; // scene comparison to determine re-render
let _lastObjs: Renderable[] | null = null; // object comparison to determine re-render
let _lastWidth: number | null = null;
let _lastHeight: number | null = null;
let _isInit = false;

type GLProps = {
   sceneRef: React.MutableRefObject<CameraOptions>;
   objsRef: React.MutableRefObject<Renderable[]>;
   texRef: React.MutableRefObject<TextureHelper>;
   renderRef: React.MutableRefObject<GLHelper>;
};

const drawScene = (
   gl: WebGLRenderingContext,
   { sceneRef, objsRef, texRef, renderRef }: GLProps
): void => {
   const scene = sceneRef.current;
   const objects = objsRef.current;
   const texHelper = texRef.current;
   const glHelper = renderRef.current;

   const { width, height } = gl.canvas.getBoundingClientRect();
   if (
      _lastScene === scene &&
      _lastObjs === objects &&
      _lastWidth === width &&
      _lastHeight === height
   )
      return;

   // set new comparisons if something changed
   _lastScene = scene;
   _lastObjs = objects;
   _lastWidth = width;
   _lastHeight = height;

   if (!_isInit) {
      texHelper
         .init(gl)
         .then(() => buildShaderSuite(gl))
         .then((shaderSuite) => glHelper.init(gl, shaderSuite))
         .then(() => glHelper.initMCube(texHelper))
         .then(() => {
            _isInit = true;
         })
         .then(() =>
            glHelper.renderObjects(
               objects,
               scene,
               texHelper.data[0].texture,
               texHelper.cmaps[0].texture
            )
         )
         .catch((err) => console.log(err));
   } else {
      glHelper.renderObjects(objects, scene, texHelper.data[0].texture, texHelper.cmaps[0].texture);
   }
};

const _cbarWidth = 25; // static cbar properties
const _xBuffer = 3;
const _cbarHeight = 150;
const _yBuffer = 10;
const _nTicks = 6;

type CanvasProps = {
   cmapRef: React.MutableRefObject<CanvasImageData>;
};

let _firstDraw = false;
const drawColorMap = (ctx: HTMLCanvasContext, { cmapRef }: CanvasProps): void => {
   const cmapData = cmapRef.current;

   // only need to draw once until we implement new colormaps
   if (_firstDraw || !cmapData) return;
   _firstDraw = true;

   const { width, height } = ctx.canvas;
   ctx.clearRect(0, 0, width, height);

   const image = new Image();
   image.onload = () => {
      ctx.fillStyle = '#b4b4b4';
      ctx.strokeStyle = '#b4b4b4';

      // draw cmap
      ctx.save(); // save current context
      ctx.translate(width - _xBuffer - _cbarWidth, height - _yBuffer); // position canvas center
      ctx.rotate(-Math.PI / 2.0); // rotate about center
      ctx.drawImage(image, 0, 0, _cbarHeight, _cbarWidth); // and draw at (0,0)

      // outline cmap
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(0, 0, _cbarHeight, _cbarWidth); // draw box
      ctx.stroke();
      ctx.restore(); // then un-rotate

      // draw axis ticks
      const dy = _cbarHeight / (_nTicks - 1);
      const x = width - _xBuffer - _cbarWidth;
      const y = height - _yBuffer;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < _nTicks; i++) {
         ctx.moveTo(x, y - i * dy);
         ctx.lineTo(x - 5, y - i * dy);
      }
      ctx.stroke();

      // draw ticks
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'right';
      for (let i = 0; i < _nTicks; i++) {
         let text = ((i * dy) / _cbarHeight).toString().slice(0, 3);
         if (text.length === 1) text += '.0';
         ctx.fillText(text, x - 10, y - i * dy + 1);
      }
   };
   image.src = URL.createObjectURL(cmapData);
};

export default { drawScene, drawColorMap };
export { drawScene, drawColorMap };
