import CmapCanvas from './cmapcanvas';
import DataCanvas from './datacanvas';
import style from './display.module.css';

function Viewport() {
   return (
      <div className={style.display__container}>
         <DataCanvas />
         <CmapCanvas />
      </div>
   );
}

export default Viewport;
