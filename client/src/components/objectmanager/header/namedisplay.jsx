import { useState, useEffect } from 'react';
import EditButton from './editbutton';
import style from './header.module.css';

const NameDisplay = ({ controller, enableEdit }) => {
   const [ showEditButton, setShowEditButton ] = useState(false);

   useEffect(() => {
      if (controller.isActive) return;
      setShowEditButton(false);
   }, [controller.isActive]);

   const handleClick = event => {
      event.stopPropagation();
      setShowEditButton(true);
   }

   return (
      <>
         <div className={`${style.controllerName} noselect`}
            title={controller.itemName}
            onClick={controller.isActive ? handleClick : null}
            onDoubleClick={controller.isActive ? enableEdit : null}
         >{controller.id} - {controller.itemName}</div>
         {showEditButton ? <EditButton enableEdit={enableEdit}/> : null }
      </>
   );
}

export default NameDisplay;