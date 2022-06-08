import { useRenderables } from '../../contexts/renderables';
import { useCamera } from '../../contexts/camera';
import './display.css';

const SceneController = ({ cameraId }) => {
   const { renderables } = useRenderables();
   const isHidden = renderables.length > 0 ? '' : 'hidden';

   return (
      <div className={`sceneController ${isHidden}`}>
         <div><div>&#171;</div></div>
         <div>1 of 1</div>
         <div><div>&#187;</div></div>
      </div>
   );
}

const SceneOptions = () => {
   const { options } = useCamera();

   const controllers = options.compare ? Array(2).fill(null) : Array(1).fill(null);

   return (
      <div className='sceneOptions'>
         {controllers.map((item, key) => {
            return <SceneController key={key}/>
         })}
      </div>
   );
}

export default SceneOptions;