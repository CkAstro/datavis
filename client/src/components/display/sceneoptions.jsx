import { useRenderables } from '../../contexts/renderables';
import { useCamera } from '../../contexts/camera';
import style from './display.module.css';

const SceneController = ({ cameraId }) => {
   const { renderables } = useRenderables();
   const isHidden = renderables.length > 0 ? '' : style.hidden;

   return (
      <div className={`${style.sceneController} ${isHidden}`}>
         <span className={style.adjust}>&#171;</span>
         <span>1 <span style={{fontWeight: 'normal'}}>of</span> 1</span>
         <span className={style.adjust}>&#187;</span>
      </div>
   );
}

const SceneOptions = () => {
   const { options } = useCamera();

   return (
      <div className={style.sceneOptions}>
         <SceneController cameraId={0}/>
         {options.compare ? <SceneController cameraId={1}/> : null}
      </div>
   );
}

export default SceneOptions;