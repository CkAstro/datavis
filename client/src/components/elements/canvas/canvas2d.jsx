import { useEffect, useRef } from 'react';

const useCanvas2D = (glRef, draw, args) => {
   const canvasRef = useRef(null);
   const renderRef = useRef(null);

   const animate = time => {
      draw(glRef.current, args);
      renderRef.current = requestAnimationFrame(animate);
   }

   // init the canvas on load
   useEffect(() => {
      const canvas = canvasRef.current;
      const gl = canvas.getContext('2d');

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      glRef.current = gl;
      
      renderRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(renderRef.current);
   }, []);

   return canvasRef;
}


const Canvas2D = ({ draw, className, style, ...args }) => {
   const glRef = useRef();
   const canvasRef = useCanvas2D(glRef, draw, args);

   return (
      <canvas ref={canvasRef} className={className} style={style}/>
   );
}

export default Canvas2D;