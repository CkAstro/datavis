import { useEffect, useState } from 'react';
import { useRenderables } from '../../../contexts/renderables';
import Icons from '../../icons';
import style from './controllerheader.module.css';

const EditButton = ({ enableEdit }) => <div className={style.editButton} onClick={enableEdit}>
   <Icons.Edit fill='black' size='12'/>
</div>;

const NameDisplay = ({ controller, enableEdit }) => {
   const [ showEditButton, setShowEditButton ] = useState(false);

   useEffect(() => {
      if (controller.isActive) return;
      setShowEditButton(false);
   }, [controller.isActive]);

   return <>
      <div className={`${style.controllerName} noselect`}
         title={controller.itemName}
         onClick={controller.isActive ? () => setShowEditButton(true) : null}
         onDoubleClick={controller.isActive ? enableEdit : null}
      >{controller.id} - {controller.itemName}</div>
      {showEditButton ? <EditButton enableEdit={enableEdit}/> : null }
   </>;
}

const NameChange = ({ controller, disableEdit }) => {
   const [ nameValue, setNameValue ] = useState(controller.itemName);
   const { changeItemName } = useRenderables();

   const requestNameChange = event => {
      event.preventDefault();
      changeItemName(nameValue, controller.id);
      disableEdit();
   }

   const handleInput = event => setNameValue(event.target.value);
   const handleFocus = event => event.target.select();

   const handleKeyPress = event => {
      if (event.keyCode === 27) disableEdit();
   }
   return (
      <form onSubmit={requestNameChange}>
         <input autoFocus className={style.nameChangeArea}
            onChange={handleInput}
            value={nameValue}
            onKeyDown={handleKeyPress}
            onBlur={disableEdit}
            onFocus={handleFocus}
         />
      </form>
   );
}

const HeaderInfo = ({ controller, isActive }) => {
   const [ editMode, setEditMode ] = useState(false);

   const enableEdit = () => setEditMode(true); 
   const disableEdit = () => setEditMode(false);

   const itemNameDiv = isActive && editMode
      ? <NameChange controller={controller} disableEdit={disableEdit}/>
      : <NameDisplay controller={controller} enableEdit={enableEdit}/>
   ;

   return (
      <div className={style.controllerInfo}>
         <div className={style.infoContainer}>
            {itemNameDiv}
         </div>
      </div>
   );
}

export default HeaderInfo;