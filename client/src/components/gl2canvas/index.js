import { useState, useEffect, useRef } from 'react';

const useGL2Canvas = (glRef, draw, scene, objects) => {
   const canvasRef = useRef();

   useEffect(() => {
      const canvas = canvasRef.current;
      const gl = canvas.getContext('webgl2');
      gl.getExtension('OES_texture_float_linear');

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      glRef.current = gl;

      let animationFrameId;
      let then = 0.0;
      const render = now => {
         now *= 0.001;
         const frameRate = then ? 1.0 / (now - then) : 0.0;

         draw(glRef.current, scene, objects, frameRate);
         animationFrameId = requestAnimationFrame(render);
      }
      render();

      return () => window.cancelAnimationFrame(animationFrameId);
   }, [draw, scene, objects]);
   return canvasRef;
}

const GL2Canvas = ({ draw, scene, objects, moveCamera }) => {
   const glRef = useRef();
   const canvasRef = useGL2Canvas(glRef, draw, scene, objects);

   const [ isActive, setIsActive ] = useState(false);
   const [ mouseLocation, setMouseLocation ] = useState({x: null, y: null});

   const handleMouseDown = ({ nativeEvent }) => {
      nativeEvent.preventDefault();
      setMouseLocation({ x: nativeEvent.clientX, y: nativeEvent.clientY });
      setIsActive(true);
   }

   const handleMouseUp = ({ nativeEvent }) => {
      nativeEvent.preventDefault();
      setIsActive(false);
   }

   const handleMouseMove = ({ nativeEvent }) => {
      if (!isActive) return;
      const deltaX = mouseLocation.x - nativeEvent.clientX;
      const deltaY = mouseLocation.y - nativeEvent.clientY;
      moveCamera(0.0, deltaX, deltaY);
      setMouseLocation({ x: nativeEvent.clientX, y: nativeEvent.clientY });
   }
   return (
      <canvas 
         ref={canvasRef} 
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
         style={{width: '600px', height: '500px'}}
      />
   );
}

export default GL2Canvas;