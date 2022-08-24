import { useEffect, useRef } from 'react';

const useCanvas2D = (glRef: HTMLCanvasContext, draw: (gl: any, args: any) => void, args: any) => {
   const canvasRef = useRef<any>(null);
   const renderRef = useRef<number | null>(null);

   const animate = () => {
      draw(glRef.current, args);
      renderRef.current = requestAnimationFrame(animate);
   };

   // init the canvas on load
   useEffect(() => {
      const canvas = canvasRef.current;
      const gl = canvas.getContext('2d');

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
   className: string;
   style: React.CSSProperties;
   args: any;
};

export const Canvas2D = ({ draw, className, style, ...args }: Props) => {
   const glRef = useRef();
   const canvasRef = useCanvas2D(glRef, draw, args);

   return <canvas ref={canvasRef} className={className} style={style} />;
};
