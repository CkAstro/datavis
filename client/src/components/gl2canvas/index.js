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
   }, []);

   useEffect(() => {
      const frameRate = 0.;
      draw(glRef.current, scene, objects, frameRate);
   }, [draw, scene, objects]);
   return canvasRef;
}

const GL2Canvas = ({ draw, scene, objects, moveCamera }) => {
   const glRef = useRef();
   const canvasRef = useGL2Canvas(glRef, draw, scene, objects);

   const [ isActive, setIsActive ] = useState(false);
   const [ mouseLocation, setMouseLocation ] = useState({x: null, y: null});
   const [ clickLocation, setClickLocation ] = useState({x: null, y: null});

   useEffect(() => {
      const canvas = glRef.current.canvas;

      // this is necessary to get around 'passive' event listeners
      // see more here: https://github.com/facebook/react/issues/19651
      canvas.addEventListener('wheel', handleScroll);
   }, [])

   const handleMouseDown = ({ nativeEvent }) => {
      nativeEvent.preventDefault();
      setMouseLocation({ x: nativeEvent.clientX, y: nativeEvent.clientY });
      setClickLocation({ x: nativeEvent.clientX, y: nativeEvent.clientY });
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

      moveCamera(clickLocation, 0.0, deltaX, deltaY);
      setMouseLocation({ x: nativeEvent.clientX, y: nativeEvent.clientY });
   }

   const handleMouseLeave = () => setIsActive(false);

   const handleScroll = event => {
      event.preventDefault();
      const zoom = event.deltaY / 2000.0;
      const mouse = {x: event.clientX, y: event.clientY};
      moveCamera(mouse, zoom, 0.0, 0.0);
   }
   
   return (
      <canvas 
         ref={canvasRef} 
         id='glCanvas'
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         style={{width: '600px', height: '500px'}}
      />
   );
}

export default GL2Canvas;