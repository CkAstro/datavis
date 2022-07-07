import { useRenderables } from '../../../contexts/renderables';
import CloseButton from './closebutton';
import VisToggle from './vistoggle';
import HeaderInfo from './headerinfo';
import style from './controllerheader.module.css';

const ControllerHeader = ({ controllerId }) => {
   const { renderables, activateRenderable } = useRenderables();

   const activeController = renderables.find(item => item.id === controllerId);
   const isActive = activeController.isActive;

   const displayToggle = () => {
      return <div className={`noselect ${style.activeToggle} ${isActive ? style.active : ''}`}
         onClick={() => activateRenderable(controllerId)}
      >{isActive ? '-' : '+'}</div>;
   }

   return (
      <div className={style.controllerHeader}>
         {displayToggle()}
         <HeaderInfo controller={activeController} isActive={isActive}/>
         <VisToggle controllerId={controllerId}/>
         <CloseButton controllerId={controllerId}/>
      </div>
   );
}

export default ControllerHeader;