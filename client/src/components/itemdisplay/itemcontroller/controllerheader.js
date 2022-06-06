import { useState, useEffect } from 'react';
import { useCamera } from '../../../contexts/camera';
import { useRenderables } from '../../../contexts/renderables';
import './itemcontroller.css';

const ControllerHeader = ({ controllerId }) => {
   const [ input, setInput ] = useState('');
   const [ editMode, setEditMode ] = useState(false);
   const [ showEditIcon, setShowEditIcon ] = useState(false);

   const { renderables, handleDelete, handleVisible, handleActivate, handleNameChange } = useRenderables();
   const { options } = useCamera();

   const enableEdit = () => {
      // setInput(activeController.itemName);
      setEditMode(true);
   }

   const disableEdit = () => {
      setEditMode(false);
      setInput('');
      setShowEditIcon(false);
   }

   const activeController = renderables.find(item => item.id === controllerId);
   const isActive = activeController.isActive;

   useEffect(() => {
      if (!isActive) {
         setEditMode(false);
         setShowEditIcon(false);
      }
   }, [isActive]);


   const handleKeyPress = event => {
      if (event.keyCode === 27) disableEdit();
   }

   const visButton1 = () => {
      const isVisible = activeController.isVisible[0];
      return (
         <div className={`toggleButton noselect ${isVisible ? 'active' : ''}`}
            onClick={() => handleVisible(controllerId, 0)}
         >1</div>
      );
   }

   const visButton2 = () => {
      const isVisible = activeController.isVisible[1];
      const isEnabled = options.compare;
      return (
         <div className={`toggleButton noselect ${isEnabled ? (isVisible ? 'active' : '') : 'disabled'}`}
            onClick={isEnabled ? () => handleVisible(controllerId, 1) : null}
         >2</div>
      );
   }

   const editIcon = isActive && showEditIcon ? 
      <img className='editIcon' onClick={() => enableEdit()} src={require('./edit.png')}/> : 
      null;

   const handleInput = event => setInput(event.target.value);
   const clearInput = event => {
      if (event.target.value === activeController.itemName) {
         setInput('');
      }
   }

   const requestNameChange = event => {
      event.preventDefault();
      handleNameChange(input, activeController.id);
      setEditMode(false);
      setShowEditIcon(false);
   }

   const nameChangeArea = (<form onSubmit={requestNameChange}>
      <input autoFocus className='nameChangeArea'
         onChange={handleInput}
         value={input}
         onClick={clearInput}
         onKeyDown={e => handleKeyPress(e)}
         onBlur={disableEdit}
      />
   </form>);
   
   const nameDisplayArea = (
      <>
         <div className='controllerName noselect' 
            title={activeController.itemName}
            onClick={() => setShowEditIcon(true)}
            onDoubleClick={() => enableEdit()}
         >
            {activeController.id} - {activeController.itemName}
         </div>
         {editIcon}
      </>
   );
   const itemNameDiv = isActive && editMode ? nameChangeArea : nameDisplayArea;

   return (
      <div className='controllerHeader'>
         <div className={`noselect activeToggle ${isActive ? 'active' : ''}`}
            onClick={() => handleActivate(controllerId)}
         >{isActive ? '-' : '+'}</div>
         <div className='controllerInfo'>
            <div className='infoContainer'>
               {itemNameDiv}
            </div>
         </div>
         <div className='visToggle'>
            {visButton1()}
            {visButton2()}
         </div>
         <img className='closeIcon'
            src={require('./trashcan_small.png')}
            onClick={() => handleDelete(controllerId)}
         />
      </div>
   );
}

export default ControllerHeader;