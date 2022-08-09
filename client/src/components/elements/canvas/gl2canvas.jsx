import { useEffect, useRef, memo } from 'react';

const useGL2Canvas = (glRef, draw, args) => {
   const canvasRef = useRef(null);
   const renderRef = useRef(null);

   const animate = () => {
      draw(glRef.current, args);
      renderRef.current = requestAnimationFrame(animate);
   };

   // init the canvas on load
   useEffect(() => {
      const canvas = canvasRef.current;
      const gl = canvas.getContext('webgl2');
      gl.getExtension('OES_texture_float_linear');

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // eslint-disable-next-line no-param-reassign
      glRef.current = gl;

      renderRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(renderRef.current);
   }, []);

   return canvasRef;
};

function GL2Canvas({ draw, eventHandlers, ...args }) {
   const glRef = useRef();
   const canvasRef = useGL2Canvas(glRef, draw, args);

   // prevent default for mouse wheel and touch
   // NOTE : this is required for touchscreen to function correctly
   useEffect(() => {
      const { canvas } = glRef.current;

      // this is necessary to get around 'passive' event listeners
      // see more here: https://github.com/facebook/react/issues/19651
      canvas.addEventListener('wheel', (e) => e.preventDefault());
      canvas.addEventListener('touchstart', (e) => e.preventDefault());
      canvas.addEventListener('touchmove', (e) => e.preventDefault());

      return () => {
         canvas.removeEventListener('wheel', (e) => e.preventDefault());
         canvas.removeEventListener('touchstart', (e) => e.preventDefault());
         canvas.removeEventListener('touchmove', (e) => e.preventDefault());
      };
   }, []);

   return (
      <canvas
         ref={canvasRef}
         id="glCanvas"
         style={{ width: '100%', height: '100%' }}
         // eslint-disable-next-line react/jsx-props-no-spreading
         {...eventHandlers}
      />
   );
}

export default memo(GL2Canvas);
