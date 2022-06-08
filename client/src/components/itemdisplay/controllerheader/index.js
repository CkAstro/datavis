import { useRenderables } from '../../../contexts/renderables';
import CloseButton from './closebutton';
import VisToggle from './vistoggle';
import HeaderInfo from './headerinfo';
import './index.css';

const ControllerHeader = ({ controllerId }) => {
   const { renderables, handleActivate } = useRenderables();

   const activeController = renderables.find(item => item.id === controllerId);
   const isActive = activeController.isActive;

   const displayToggle = () => {
      return <div className={`noselect activeToggle ${isActive ? 'active' : ''}`}
         onClick={() => handleActivate(controllerId)}
      >{isActive ? '-' : '+'}</div>;
   }

   return (
      <div className='controllerHeader'>
         {displayToggle()}
         <HeaderInfo controller={activeController} isActive={isActive}/>
         <VisToggle controllerId={controllerId}/>
         <CloseButton controllerId={controllerId}/>
      </div>
   );
}

export default ControllerHeader;