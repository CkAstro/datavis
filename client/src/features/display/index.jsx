import { useEffect, useRef, useState } from 'react';
import { useCamera, useRenderables } from 'contexts';
import { GL2Canvas, Canvas2D, Modal } from 'components/elements';
import { drawScene, drawColorMap, texHelper, glHelper } from 'utils';
import {
   SessionController,
   UploadController,
   CameraController,
   ViewController,
   HelpController
} from 'components/controllers';
import SceneOptions from './sceneoptions';
import style from './display.module.css';

const Display = () => {
   const [ cmapData, setCmapData ] = useState(null);
   const [ passThroughEvent, setPassThroughEvent ] = useState({event: null, eventType: null});
   const { options, moveCamera } = useCamera();
   const { renderables } = useRenderables();

   const sceneRef = useRef(options);
   useEffect(() => {
      sceneRef.current = options;
   }, [options]);

   const objsRef = useRef(renderables);
   useEffect(() => {
      objsRef.current = renderables;
   }, [renderables]);

   // these two reference do not need to be updated
   // since the object is never replaced
   const texRef = useRef(texHelper);
   const renderRef = useRef(glHelper);

   // ensure canvas touch events don't move screen
   const divRef = useRef(null);
   useEffect(() => {
      divRef.current.addEventListener('wheel', e => e.preventDefault());
      divRef.current.addEventListener('touchstart', e => e.preventDefault());
      divRef.current.addEventListener('touchmove', e => e.preventDefault());

      return () => {
         divRef.current.removeEventListener('wheel', e => e.preventDefault());
         divRef.current.removeEventListener('touchstart', e => e.preventDefault());
         divRef.current.removeEventListener('touchmove', e => e.preventDefault());
      }
   }, []);

   // we have a 2D canvas overlaid, this will register mouse events in the container and pass to GL2Canvas
   const handleMouseDown = event => setPassThroughEvent({event, eventType: 'mouseDown'});
   const handleMouseUp = event => setPassThroughEvent({event, eventType: 'mouseUp'});
   const handleMouseMove = event => setPassThroughEvent({event, eventType: 'mouseMove'});
   const handleMouseLeave = event => setPassThroughEvent({event, eventType: 'mouseLeave'});
   const handleTouchStart = event => setPassThroughEvent({event, eventType: 'touchStart'});
   const handleTouchEnd = event => setPassThroughEvent({event, eventType: 'touchEnd'});
   const handleTouchMove = event => setPassThroughEvent({event, eventType: 'touchMove'});
   const handleScroll = event => setPassThroughEvent({event, eventType: 'scroll'});

   // update 2D canvas if cmap changes
   useEffect(() => {
      const cmaps = texHelper.cmaps;
      if (cmaps.length === 0) return;
      setCmapData(cmaps[cmaps.length-1].data);
   }, [texHelper.cmaps]);

   return (
      <div className={style.displayArea}>
         <p><b>Display</b></p>
         <Modal/>
         <div className={style.actionbar}>
            <HelpController/>
            <SessionController/>
            <UploadController/>
            <CameraController/>
            <ViewController/>
         </div>
         <div className={style.canvasContainer}
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
            <GL2Canvas 
               draw={drawScene} 
               moveCamera={moveCamera}
               passThroughEvent={passThroughEvent}
               sceneRef={sceneRef}
               objsRef={objsRef}
               texRef={texRef}
               renderRef={renderRef}
            />
            <Canvas2D
               draw={drawColorMap}
               objects={cmapData}
            />
         </div>
         <SceneOptions/>
      </div>
   );
}

export default Display;