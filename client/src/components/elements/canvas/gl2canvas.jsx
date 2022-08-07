import { useState, useEffect, useRef } from 'react';

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

function GL2Canvas({ draw, moveCamera, passThroughEvent, ...args }) {
   const glRef = useRef();
   const canvasRef = useGL2Canvas(glRef, draw, args);

   const [isActive, setIsActive] = useState(false);
   const [mouseLocation, setMouseLocation] = useState({ x: null, y: null });
   const [clickLocation, setClickLocation] = useState({ x: null, y: null });

   const handleMouseDown = ({ nativeEvent }) => {
      nativeEvent.preventDefault();
      setMouseLocation({ x: nativeEvent.clientX, y: nativeEvent.clientY });
      setClickLocation({ x: nativeEvent.clientX, y: nativeEvent.clientY });
      setIsActive(true);
   };

   const handleMouseUp = ({ nativeEvent }) => {
      nativeEvent.preventDefault();
      setIsActive(false);
   };

   const handleMouseMove = ({ nativeEvent }) => {
      if (!isActive) return;
      const deltaX = mouseLocation.x - nativeEvent.clientX;
      const deltaY = mouseLocation.y - nativeEvent.clientY;

      moveCamera(clickLocation, 0.0, deltaX, deltaY);
      setMouseLocation({ x: nativeEvent.clientX, y: nativeEvent.clientY });
   };

   const handleMouseLeave = () => setIsActive(false);

   const handleScroll = (event) => {
      event.preventDefault();
      const zoom = event.deltaY / 1000.0;
      const mouse = { x: event.clientX, y: event.clientY };
      moveCamera(mouse, zoom, 0.0, 0.0);
   };

   const handleTouchStart = ({ nativeEvent }) => {
      const event = nativeEvent.changedTouches[0];
      setMouseLocation({ x: event.clientX, y: event.clientY });
      setClickLocation({ x: event.clientX, y: event.clientY });
      setIsActive(true);
   };

   const handleTouchEnd = () => {
      setIsActive(false);
   };

   const handleTouchMove = ({ nativeEvent }) => {
      if (!isActive) return;
      const event = nativeEvent.changedTouches[0];
      const deltaX = mouseLocation.x - event.clientX;
      const deltaY = mouseLocation.y - event.clientY;

      moveCamera(clickLocation, 0.0, deltaX, deltaY);
      setMouseLocation({ x: event.clientX, y: event.clientY });
   };

   // event handler when input is given via passThroughEvent
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

   // prevent default for mouse wheel and touch
   useEffect(() => {
      const { canvas } = glRef.current;

      // this is necessary to get around 'passive' event listeners
      // see more here: https://github.com/facebook/react/issues/19651
      canvas.addEventListener('wheel', handleScroll);
      canvas.addEventListener('touchstart', (e) => e.preventDefault());
      canvas.addEventListener('touchmove', (e) => e.preventDefault());

      return () => {
         canvas.removeEventListener('wheel', handleScroll);
         canvas.removeEventListener('touchstart', (e) => e.preventDefault());
         canvas.removeEventListener('touchmove', (e) => e.preventDefault());
      };
   }, []);

   return (
      <canvas
         ref={canvasRef}
         id="glCanvas"
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         onTouchStart={handleTouchStart}
         onTouchEnd={handleTouchEnd}
         onTouchMove={handleTouchMove}
         style={{ width: '100%', height: '100%' }}
      />
   );
}

export default GL2Canvas;
