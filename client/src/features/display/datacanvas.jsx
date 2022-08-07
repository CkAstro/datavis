import { useEffect, useRef } from 'react';
import { useCamera, useRenderables } from 'contexts';
import { texHelper, glHelper } from 'utils';
import { GL2Canvas } from 'components/elements';
import { drawScene } from './drawscene';

function DataCanvas({ passThroughEvent }) {
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

   return (
      <GL2Canvas
         draw={drawScene}
         moveCamera={moveCamera}
         passThroughEvent={passThroughEvent}
         sceneRef={sceneRef}
         objsRef={objsRef}
         texRef={texRef}
         renderRef={renderRef}
      />
   );
}

export default DataCanvas;
