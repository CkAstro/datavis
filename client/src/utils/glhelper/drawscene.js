import buildShaderSuite from 'utils/shaders/shadersuite';

const drawScene = (gl, scene, objects, texHelper, glHelper) => {
   if (!glHelper.isInit) buildShaderSuite(gl).then(shaderSuite => glHelper.init(gl, shaderSuite));
   if (!texHelper.isInit) texHelper.init(gl);
   glHelper.renderObjectList(objects, scene, texHelper.data, texHelper.cmaps);
}


const drawColorMap = (ctx, cmapData) => {
   const _cbarWidth = 25;
   const _xBuffer = 3;
   const _cbarHeight = 150;
   const _yBuffer = 10;
   const _nTicks = 6;
   if (!cmapData) return;
   const { width, height } = ctx.canvas;
   ctx.clearRect(0, 0, width, height);

   const image = new Image;
   image.onload = () => {
      // draw cmap
      ctx.save();                                                 // save current context
      ctx.translate(width-_xBuffer-_cbarWidth, height-_yBuffer);  // position canvas center
      ctx.rotate(-Math.PI/2.0);                                   // rotate about center
      ctx.drawImage(image, 0, 0, _cbarHeight, _cbarWidth);        // and draw at (0,0)
      
      // outline cmap
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(0, 0, _cbarHeight, _cbarWidth);                    // draw box
      ctx.stroke();
      ctx.restore();                                              // then un-rotate

      // draw axis ticks
      const dy = _cbarHeight / (_nTicks-1);
      const x = width - _xBuffer - _cbarWidth;
      const y = height - _yBuffer;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i=0; i<_nTicks; i++) {
         ctx.moveTo(x, y-i*dy);
         ctx.lineTo(x-5, y-i*dy);
      }
      ctx.stroke();

      // draw ticks
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'right';
      for (let i=0; i<_nTicks; i++) {
         ctx.fillText(i*dy/_cbarHeight, x-10, y-i*dy+1);

      }
   }
   image.src = URL.createObjectURL(cmapData);
}

export default { drawScene, drawColorMap };
export { drawScene, drawColorMap };