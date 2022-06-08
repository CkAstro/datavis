import { useRenderables } from '../../../contexts/renderables';
import { useCamera } from '../../../contexts/camera';
import './index.css';

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
               className={`toggleButton noselect ${isEnabled ? (isVisible ? 'active' : '') : 'disabled'}`}
               onClick={() => handleVisible(controllerId, key)}
            >{val}</div>
         );
      })
   }

   return (
      <div className='visToggle'>
         {getButtons()}
      </div>
   );
}

export default VisToggle;