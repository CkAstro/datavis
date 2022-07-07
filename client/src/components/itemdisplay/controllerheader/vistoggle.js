import { useRenderables } from '../../../contexts/renderables';
import { useCamera } from '../../../contexts/camera';
import style from './controllerheader.module.css';

const VisToggle = ({ controllerId }) => {
   const { renderables, handleVisible } = useRenderables();
   const { options } = useCamera();

   const activeController = renderables.find(item => item.id === controllerId);

   const visButtons = [1, 2];
   const getButtons = () => {
      return visButtons.map((val, key) => {
         const isVisible = activeController.isVisible[key];
         const isEnabled = key === 0 ? true : options.compare;    // main viewport button always enabled
         return (
            <div key={key}
               className={`${style.toggleButton} noselect ${isEnabled ? (isVisible ? style.active : '') : style.disabled}`}
               onClick={() => handleVisible(controllerId, key)}
            >{val}</div>
         );
      })
   }

   return (
      <div className={style.visToggle}>
         {getButtons()}
      </div>
   );
}

export default VisToggle;