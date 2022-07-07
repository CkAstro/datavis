import { useState } from 'react';
import { useRenderables } from '../../../contexts/renderables';
import style from './controllerheader.module.css';

const EditButton = ({ enableEdit }) => <img className='editIcon'
   onClick={enableEdit}
   src={require('./img/edit.png')}
/>;

const NameDisplay = ({ controller, enableEdit }) => {
   const [ showEditButton, setShowEditButton ] = useState(false);

   return (
      <>
         <div className={`${style.controllerName} noselect`}
            title={controller.itemName}
            onClick={controller.isActive ? () => setShowEditButton(true) : null}
            onDoubleClick={controller.isActive ? enableEdit : null}
         >{controller.id} - {controller.itemName}</div>
         {showEditButton ? <EditButton enableEdit={enableEdit}/> : null }
      </>
   );
}

const NameChange = ({ controller, disableEdit }) => {
   const [ nameValue, setNameValue ] = useState(controller.itemName);
   const { handleNameChange } = useRenderables();

   const requestNameChange = event => {
      event.preventDefault();
      handleNameChange(nameValue, controller.id);
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

   const itemNameDiv = isActive && editMode ? 
      <NameChange controller={controller} disableEdit={disableEdit}/> : 
      <NameDisplay controller={controller} enableEdit={enableEdit}/>;
   return (
      <div className={style.controllerInfo}>
         <div className={style.infoContainer}>
            {itemNameDiv}
         </div>
      </div>
   );
}

export default HeaderInfo;