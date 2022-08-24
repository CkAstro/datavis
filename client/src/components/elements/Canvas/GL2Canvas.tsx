import { useEffect, useRef, memo } from 'react';

const useGL2Canvas = (glRef: any, draw: (gl: any, args: any) => void, args: any) => {
   const canvasRef = useRef<any>(null);
   const renderRef = useRef<number | null>(null);

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
      return () => cancelAnimationFrame(renderRef.current!);
   }, []);

   return canvasRef;
};

type Props = {
   draw: (gl: any, args: any) => void;
   eventHandlers: any;
   args: any;
};

export const GL2Canvas = memo(({ draw, eventHandlers, ...args }: Props) => {
   const glRef = useRef<any>();
   const canvasRef = useGL2Canvas(glRef, draw, args);

   // prevent default for mouse wheel and touch
   // NOTE : this is required for touchscreen to function correctly
   useEffect(() => {
      const { canvas } = glRef.current;

      // this is necessary to get around 'passive' event listeners
      // see more here: https://github.com/facebook/react/issues/19651
      canvas.addEventListener('wheel', (e: React.MouseEvent) => e.preventDefault());
      canvas.addEventListener('touchstart', (e: React.TouchEvent) => e.preventDefault());
      canvas.addEventListener('touchmove', (e: React.TouchEvent) => e.preventDefault());

      return () => {
         canvas.removeEventListener('wheel', (e: React.MouseEvent) => e.preventDefault());
         canvas.removeEventListener('touchstart', (e: React.TouchEvent) => e.preventDefault());
         canvas.removeEventListener('touchmove', (e: React.TouchEvent) => e.preventDefault());
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
});
