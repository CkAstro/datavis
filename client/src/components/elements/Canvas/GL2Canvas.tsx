import { useEffect, useRef, memo } from 'react';

const useGL2Canvas = (
   glRef: React.MutableRefObject<WebGLRenderingContext | null>,
   draw: (gl: WebGLRenderingContext, args: { args: Record<string, unknown> }) => void,
   args: { args: Record<string, unknown> }
): React.MutableRefObject<HTMLCanvasElement | null> => {
   const canvasRef = useRef<HTMLCanvasElement | null>(null);
   const renderRef = useRef<number | null>(null);

   const animate = (): void => {
      draw(glRef.current!, args);
      renderRef.current = requestAnimationFrame(animate);
   };

   // init the canvas on load
   useEffect(() => {
      const canvas = canvasRef.current!;
      const gl = canvas.getContext('webgl2')!;
      gl.getExtension('OES_texture_float_linear');

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      glRef.current = gl;

      renderRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(renderRef.current!);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return canvasRef;
};

type Props = {
   draw: (gl: WebGLRenderingContext, args: { args: Record<string, unknown> }) => void;
   eventHandlers: Record<string, unknown>;
   args: Record<string, unknown>;
};

export const GL2Canvas = memo(({ draw, eventHandlers, ...args }: Props) => {
   console.log('args are:', args);
   const glRef = useRef<WebGLRenderingContext | null>(null);
   const canvasRef = useGL2Canvas(glRef, draw, args);

   // prevent default for mouse wheel and touch
   // NOTE : this is required for touchscreen to function correctly
   useEffect(() => {
      const { canvas } = glRef.current!;

      // this is necessary to get around 'passive' event listeners
      // see more here: https://github.com/facebook/react/issues/19651
      canvas.addEventListener('wheel', (e: MouseEvent) => e.preventDefault());
      canvas.addEventListener('touchstart', (e: TouchEvent) => e.preventDefault());
      canvas.addEventListener('touchmove', (e: TouchEvent) => e.preventDefault());

      return (): void => {
         canvas.removeEventListener('wheel', (e: MouseEvent) => e.preventDefault());
         canvas.removeEventListener('touchstart', (e: TouchEvent) => e.preventDefault());
         canvas.removeEventListener('touchmove', (e: TouchEvent) => e.preventDefault());
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
