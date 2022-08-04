import { useState, useEffect, useRef } from 'react';
import { texHelper } from 'utils';
import { Canvas2D } from 'components/elements';
import { drawColorMap } from './drawscene';
import style from './display.module.css';

const CmapCanvas = () =>  {
   const [ cmapData, setCmapData ] = useState(null);

   const cmapRef = useRef(cmapData);
   useEffect(() => {
      cmapRef.current = cmapData;
   }, [cmapData]);

   useEffect(() => {
      const cmaps = texHelper.cmaps;
      if (cmaps.length === 0) return;
      setCmapData(cmaps[cmaps.length-1].data);
   }, [texHelper.cmaps]);

   return (
      <Canvas2D
         className={style.display__colorbar}
         draw={drawColorMap}
         cmapRef={cmapRef}
      />
   );
}

export default CmapCanvas;