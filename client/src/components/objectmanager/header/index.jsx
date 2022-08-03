import { useRenderables } from 'contexts';
import CloseButton from './closebutton';
import VisToggle from './vistoggle';
import HeaderInfo from './headerinfo';
import style from './header.module.css';

const ControllerHeader = ({ controllerId }) => {
   const { renderables, activateRenderable } = useRenderables();

   const activeController = renderables.find(item => item.id === controllerId);
   const isActive = activeController.isActive;

   const displayToggle = (
      <div className={`noselect ${style.activeToggle} ${isActive ? style.active : ''}`}>
         {isActive ? '-' : '+'}
      </div>
   );

   return (
      <div className={style.controllerHeader} onClick={() => activateRenderable(controllerId)}>
         {displayToggle}
         <HeaderInfo controllerId={controllerId} controller={activeController} isActive={isActive}/>
         <VisToggle controllerId={controllerId}/>
         <CloseButton controllerId={controllerId}/>
      </div>
   );
}

export default ControllerHeader;