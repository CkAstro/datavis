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

const GL2Canvas = ({ draw, scene, objects, moveCamera, passThroughEvent }) => {
   const glRef = useRef();
   const canvasRef = useGL2Canvas(glRef, draw, scene, objects);

   const [ isActive, setIsActive ] = useState(false);
   const [ mouseLocation, setMouseLocation ] = useState({x: null, y: null});
   const [ clickLocation, setClickLocation ] = useState({x: null, y: null});

   useEffect(() => {
      const { event, eventType } = passThroughEvent;
      if (eventType === 'mouseDown') handleMouseDown(event);
      if (eventType === 'mouseUp') handleMouseUp(event);
      if (eventType === 'mouseMove') handleMouseMove(event);
      if (eventType === 'mouseLeave') handleMouseLeave(event);
      if (eventType === 'scroll') handleScroll(event);
      if (eventType === 'touchStart') handleTouchStart(event);
      if (eventType === 'touchEnd') handleTouchEnd(event);
      if (eventType === 'touchMove') handleTouchMove(event);
   }, [passThroughEvent]);

   useEffect(() => {
      const canvas = glRef.current.canvas;

      // this is necessary to get around 'passive' event listeners
      // see more here: https://github.com/facebook/react/issues/19651
      canvas.addEventListener('wheel', handleScroll);
      canvas.addEventListener('touchstart', e => e.preventDefault());
      canvas.addEventListener('touchmove', e => e.preventDefault());

      return () => {
         canvas.removeEventListener('wheel', handleScroll);
         canvas.removeEventListener('touchstart', e => e.preventDefault());
         canvas.removeEventListener('touchmove', e => e.preventDefault());
      }
   }, []);

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

   const handleTouchStart = ({ nativeEvent }) => {
      const event = nativeEvent.changedTouches[0];
      setMouseLocation({ x: event.clientX, y: event.clientY });
      setClickLocation({ x: event.clientX, y: event.clientY });
      setIsActive(true);
   }

   const handleTouchEnd = () => {
      setIsActive(false);
   }

   const handleTouchMove = ({ nativeEvent }) => {
      if (!isActive) return;
      const event = nativeEvent.changedTouches[0];
      const deltaX = mouseLocation.x - event.clientX;
      const deltaY = mouseLocation.y - event.clientY;

      moveCamera(clickLocation, 0.0, deltaX, deltaY);
      setMouseLocation({ x: event.clientX, y: event.clientY });
   }
   
   return (
      <canvas 
         ref={canvasRef} 
         id='glCanvas'
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}

         onTouchStart={handleTouchStart}
         onTouchEnd={handleTouchEnd}
         onTouchMove={handleTouchMove}

         style={{width: '100%', height: '100%'}}
      />
   );
}

export default GL2Canvas;