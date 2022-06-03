import { useState, useEffect } from 'react';
import { useCamera } from '../../../contexts/camera';
import { useRenderables } from '../../../contexts/renderables';
import './itemcontroller.css';

const ControllerHeader = ({ controllerId }) => {
   const [ input, setInput ] = useState('');
   const [ editMode, setEditMode ] = useState(false);
   const { renderables, handleDelete, handleVisible, handleActivate, handleNameChange } = useRenderables();
   const { options } = useCamera();

   const enableEdit = () => {
      // setInput(activeController.itemName);
      setEditMode(true);
   }

   const activeController = renderables.find(item => item.id === controllerId);
   const isActive = activeController.isActive;

   useEffect(() => {
      if (!isActive) setEditMode(false);
   }, [isActive]);


   useEffect(() => {
      const handleKeyPress = event => {
         if (event.keyCode === 27) setEditMode(false);
      }

      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
   });

   const visButton1 = () => {
      const isVisible = activeController.isVisible[0];
      return (
         <div className={`toggleButton ${isVisible ? 'active' : ''}`}
            onClick={() => handleVisible(controllerId, 0)}
         >1</div>
      );
   }

   const visButton2 = () => {
      const isVisible = activeController.isVisible[1];
      const isEnabled = options.compare;
      return (
         <div className={`toggleButton ${isEnabled ? (isVisible ? 'active' : '') : 'disabled'}`}
            onClick={isEnabled ? () => handleVisible(controllerId, 1) : null}
         >2</div>
      );
   }

   const editIcon = isActive ? 
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
   }

   const nameChangeArea = (<form onSubmit={requestNameChange}>
      <input autoFocus className='nameChangeArea'
         onChange={handleInput}
         value={input}
         onClick={clearInput}
      />
   </form>);
   
   const nameDisplayArea = <><div className='controllerName' title={activeController.itemName}>{activeController.id} - {activeController.itemName}</div>{editIcon}</>;
   const itemNameDiv = isActive && editMode ? nameChangeArea : nameDisplayArea;
   
   return (
      <div className='controllerHeader'>
         <div className={`activeToggle ${isActive ? 'active' : ''}`}
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