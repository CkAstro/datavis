import CmapCanvas from './CmapCanvas';
import DataCanvas from './DataCanvas';
import css from './Display.module.scss';

const Viewport = (): JSX.Element => (
   <div className={css.display__container}>
      <DataCanvas />
      <CmapCanvas />
   </div>
);

export default Viewport;
