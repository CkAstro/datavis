import { useCamera, useRenderables } from '@/contexts';
import css from './Display.module.scss';

// 'cameraId' will be used to control which timestep is displayed
// eslint-disable-next-line no-unused-vars
const SceneController = (): JSX.Element => {
   const { renderables } = useRenderables();
   const isHidden = renderables.length > 0 ? '' : css.hidden;

   return (
      <div className={`${css.sceneController} ${isHidden}`}>
         <span className={css.adjust}>&#171;</span>
         <span>
            1 <span style={{ fontWeight: 'normal' }}>of</span> 1
         </span>
         <span className={css.adjust}>&#187;</span>
      </div>
   );
};

const SceneOptions = (): JSX.Element => {
   const { options } = useCamera();

   return (
      <div className={css.sceneOptions}>
         <SceneController />
         {options.compare ? <SceneController /> : null}
      </div>
   );
};

export default SceneOptions;
