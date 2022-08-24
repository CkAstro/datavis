import { useState, useEffect, useRef } from 'react';
import { Canvas2D } from '@/components/elements';
import { texHelper } from '@/utils';
import { drawColorMap } from './drawScene';
import css from './Display.module.scss';

const CmapCanvas = (): JSX.Element => {
   const [cmapData, setCmapData] = useState<CanvasImageData | null>(null);

   const cmapRef = useRef(cmapData);
   useEffect(() => {
      cmapRef.current = cmapData;
   }, [cmapData]);

   useEffect(() => {
      const { cmaps } = texHelper;
      if (cmaps.length === 0) return;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setCmapData(cmaps[cmaps.length - 1].data);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [texHelper.cmaps]);

   return <Canvas2D className={css.display__colorbar} draw={drawColorMap} cmapRef={cmapRef} />;
};

export default CmapCanvas;
