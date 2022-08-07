import { useState } from 'react';
import { useRenderables } from 'contexts';
import style from './header.module.css';

function NameChange({ controller, disableEdit }) {
   const [nameValue, setNameValue] = useState(controller.itemName);
   const { changeItemName } = useRenderables();

   const requestNameChange = (event) => {
      event.preventDefault();
      changeItemName(nameValue, controller.id);
      disableEdit();
   };

   const handleInput = (event) => setNameValue(event.target.value);
   const handleFocus = (event) => event.target.select();
   const handleClick = (event) => event.stopPropagation();

   const handleKeyPress = (event) => {
      if (event.keyCode === 27) disableEdit();
   };

   return (
      <form onSubmit={requestNameChange}>
         <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            className={style.nameChangeArea}
            onChange={handleInput}
            value={nameValue}
            onKeyDown={handleKeyPress}
            onBlur={disableEdit}
            onFocus={handleFocus}
            onClick={handleClick}
         />
      </form>
   );
}

export default NameChange;
