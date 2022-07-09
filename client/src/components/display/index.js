import { useEffect, useRef, useState } from 'react';
import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import { GL2Canvas, Canvas2D } from '../canvas';
import { drawScene, drawColorMap } from '../../utils/glhelper/drawscene';
import SceneOptions from './sceneoptions';
import Modal from '../modal';
import SessionController from '../sessioncontroller';
import UploadController from '../uploadcontroller';
import CameraController from '../cameracontroller';
import ViewController from '../viewcontroller';
import texHelper from '../../utils/texturehelper';
import glHelper from '../../utils/glhelper';
import style from './display.module.css';

const Display = () => {
   const [ cmapData, setCmapData ] = useState(null);
   const [ passThroughEvent, setPassThroughEvent ] = useState({event: null, eventType: null});
   const { options, moveCamera } = useCamera();
   const { renderables } = useRenderables();

   const divRef = useRef(null);
   useEffect(() => {
      divRef.current.addEventListener('touchstart', e => e.preventDefault());
      divRef.current.addEventListener('touchmove', e => e.preventDefault());

      return () => {
         divRef.current.removeEventListener('touchstart', e => e.preventDefault());
         divRef.current.removeEventListener('touchmove', e => e.preventDefault());
      }
   }, []);

   const handleMouseDown = event => setPassThroughEvent({event, eventType: 'mouseDown'});
   const handleMouseUp = event => setPassThroughEvent({event, eventType: 'mouseUp'});
   const handleMouseMove = event => setPassThroughEvent({event, eventType: 'mouseMove'});
   const handleMouseLeave = event => setPassThroughEvent({event, eventType: 'mouseLeave'});
   const handleTouchStart = event => setPassThroughEvent({event, eventType: 'touchStart'});
   const handleTouchEnd = event => setPassThroughEvent({event, eventType: 'touchEnd'});
   const handleTouchMove = event => setPassThroughEvent({event, eventType: 'touchMove'});
   const handleScroll = event => setPassThroughEvent({event, eventType: 'scroll'});

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
               scene={options} 
               objects={renderables} 
               moveCamera={moveCamera}
               texHelper={texHelper}
               glHelper={glHelper}
               passThroughEvent={passThroughEvent}
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