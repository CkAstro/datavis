import { useState } from 'react';
import { useRenderables } from 'contexts/renderables';
import style from './controllerheader.module.css';

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

export default NameChange;