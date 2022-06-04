import { useEffect, useRef } from 'react';

const useGL2Canvas = (glRef, draw, scene, objects) => {
   const canvasRef = useRef();

   useEffect(() => {
      const canvas = canvasRef.current;
      const gl = canvas.getContext('webgl2');

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      glRef.current = gl;

      let animationFrameId;
      let then = 0.0;
      const render = now => {
         now *= 0.001;
         const frameRate = then ? 1.0 / (now - then) : 0.0;

         glRef.current.clearColor(1.0, 0.0, 0.0, 0.5);
         draw(glRef.current, scene, objects, frameRate);
         animationFrameId = requestAnimationFrame(render);
      }
      render();

      return () => window.cancelAnimationFrame(animationFrameId);
   }, [draw]);
   return canvasRef;
}

const GL2Canvas = ({ draw, scene, objects }) => {
   const glRef = useRef();
   const canvasRef = useGL2Canvas(glRef, draw, scene, objects);
   return (
      <canvas 
         ref={canvasRef} 
         onMouseDown={null}
         onMouseUp={null}
         onMouseMove={null}
         style={{width: '600px', height: '500px'}}
      />
   );
}

export default GL2Canvas;