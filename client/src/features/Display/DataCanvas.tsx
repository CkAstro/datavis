import { useEffect, useMemo, useRef } from 'react';
import { GL2Canvas } from '@/components/elements';
import { useCamera, useRenderables } from '@/contexts';
import type { MouseLocation } from '@/types';
import { texHelper, glHelper } from '@/utils';
import { drawScene } from './drawScene';
import getEventHandlers from './eventHandlers';

// NOTE : getEventHandlers is wrapped in useMemo and so
//    isActive / mouseLocation / clickLocation must be
//    refs rather than states
const DataCanvas = (): JSX.Element => {
   const { options, moveCamera } = useCamera();
   const { renderables } = useRenderables();

   const isActive = useRef(false);
   const setIsActive = (status: boolean): void => {
      isActive.current = status;
   };

   const mouseLocation = useRef<MouseLocation>({ x: null, y: null });
   const setMouseLocation = (location: MouseLocation): void => {
      mouseLocation.current = location;
   };

   const clickLocation = useRef<MouseLocation>({ x: null, y: null });
   const setClickLocation = (location: MouseLocation): void => {
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

   const eventHandlers = useMemo(
      () =>
         getEventHandlers({
            isActive,
            setIsActive,
            mouseLocation,
            setMouseLocation,
            clickLocation,
            setClickLocation,
            moveCamera,
         }),
      [moveCamera]
   );

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
};

export default DataCanvas;
