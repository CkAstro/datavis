import { useEffect, useRef } from 'react';
import { useCamera, useRenderables } from 'contexts';
import { texHelper, glHelper } from 'utils';
import { GL2Canvas } from 'components/elements';
import { drawScene } from './drawscene';
import getEventHandlers from './eventhandlers';

// NOTE : getEventHandlers is wrapped in useMemo and so
//    isActive / mouseLocation / clickLocation must be
//    refs rather than states
function DataCanvas() {
   const { options, moveCamera } = useCamera();
   const { renderables } = useRenderables();

   const isActive = useRef(false);
   const setIsActive = (status) => {
      isActive.current = status;
   };

   const mouseLocation = useRef({ x: null, y: null });
   const setMouseLocation = (location) => {
      mouseLocation.current = location;
   };

   const clickLocation = useRef({ x: null, y: null });
   const setClickLocation = (location) => {
      clickLocation.current = location;
   };

   const sceneRef = useRef(options);
   useEffect(() => {
      sceneRef.current = options;
   }, [options]);

   const objsRef = useRef(renderables);
   useEffect(() => {
      objsRef.current = renderables;
   }, [renderables]);

   // these two references do not need to be updated
   // since the object is never replaced
   const texRef = useRef(texHelper);
   const renderRef = useRef(glHelper);

   const eventHandlers = getEventHandlers({
      isActive,
      setIsActive,
      mouseLocation,
      setMouseLocation,
      clickLocation,
      setClickLocation,
      moveCamera,
   });

   return (
      <GL2Canvas
         draw={drawScene}
         eventHandlers={eventHandlers}
         sceneRef={sceneRef}
         objsRef={objsRef}
         texRef={texRef}
         renderRef={renderRef}
      />
   );
}

export default DataCanvas;
