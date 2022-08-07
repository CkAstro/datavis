import { useState, useEffect, useRef } from 'react';
import CmapCanvas from './cmapcanvas';
import DataCanvas from './datacanvas';
import style from './display.module.css';

function Viewport() {
   const [passThroughEvent, setPassThroughEvent] = useState({
      event: null,
      eventType: null,
   });

   // ensure canvas touch events don't move screen
   const divRef = useRef(null);
   useEffect(() => {
      divRef.current.addEventListener('wheel', (e) => e.preventDefault());
      divRef.current.addEventListener('touchstart', (e) => e.preventDefault());
      divRef.current.addEventListener('touchmove', (e) => e.preventDefault());

      return () => {
         divRef.current.removeEventListener('wheel', (e) => e.preventDefault());
         divRef.current.removeEventListener('touchstart', (e) =>
            e.preventDefault()
         );
         divRef.current.removeEventListener('touchmove', (e) =>
            e.preventDefault()
         );
      };
   }, []);

   // we have a 2D canvas overlaid, this will register mouse events in the container and pass to GL2Canvas
   const handleMouseDown = (event) =>
      setPassThroughEvent({ event, eventType: 'mouseDown' });
   const handleMouseUp = (event) =>
      setPassThroughEvent({ event, eventType: 'mouseUp' });
   const handleMouseMove = (event) =>
      setPassThroughEvent({ event, eventType: 'mouseMove' });
   const handleMouseLeave = (event) =>
      setPassThroughEvent({ event, eventType: 'mouseLeave' });
   const handleTouchStart = (event) =>
      setPassThroughEvent({ event, eventType: 'touchStart' });
   const handleTouchEnd = (event) =>
      setPassThroughEvent({ event, eventType: 'touchEnd' });
   const handleTouchMove = (event) =>
      setPassThroughEvent({ event, eventType: 'touchMove' });
   const handleScroll = (event) =>
      setPassThroughEvent({ event, eventType: 'scroll' });

   return (
      <div
         className={style.display__container}
         ref={divRef}
         onMouseDown={handleMouseDown}
         onMouseUp={handleMouseUp}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         onTouchStart={handleTouchStart}
         onTouchEnd={handleTouchEnd}
         onTouchMove={handleTouchMove}
         onWheel={handleScroll}
      >
         <DataCanvas passThroughEvent={passThroughEvent} />
         <CmapCanvas />
      </div>
   );
}

export default Viewport;
