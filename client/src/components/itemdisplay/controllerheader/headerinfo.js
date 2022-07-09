import { useState } from 'react';
import { useRenderables } from '../../../contexts/renderables';
import NameDisplay from './namedisplay';
import NameChange from './namechange';
import style from './controllerheader.module.css';

const HeaderInfo = ({ controllerId, controller, isActive }) => {
   const [ editMode, setEditMode ] = useState(false);
   const { activateRenderable } = useRenderables();

   const enableEdit = () => setEditMode(true); 
   const disableEdit = () => setEditMode(false);

   const itemNameDiv = isActive && editMode
      ? <NameChange controller={controller} disableEdit={disableEdit}/>
      : <NameDisplay controller={controller} enableEdit={enableEdit}/>
   ;

   const handleClick = event => {
      event.stopPropagation();
      activateRenderable(controllerId);
   }

   return (
      <div className={style.controllerInfo} onClick={handleClick}>
         <div className={style.infoContainer}>
            {itemNameDiv}
         </div>
      </div>
   );
}

export default HeaderInfo;