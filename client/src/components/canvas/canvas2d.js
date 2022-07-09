import { useState, useEffect, useRef } from 'react';

const useCanvas2D = (glRef, draw, objects) => {
   const canvasRef = useRef();

   useEffect(() => {
      const canvas = canvasRef.current;
      const gl = canvas.getContext('2d');

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      glRef.current = gl;
   }, []);

   useEffect(() => {
      draw(glRef.current, objects);
   }, [draw, objects]);

   return canvasRef;
}


const Canvas2D = ({ draw, objects }) => {
   const glRef = useRef();
   const canvasRef = useCanvas2D(glRef, draw, objects);

   return (
      <canvas ref={canvasRef} style={{width: '100%', height: '100%'}}/>
   );
}

export default Canvas2D;