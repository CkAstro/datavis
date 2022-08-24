import { useState } from 'react';
import { useRenderables } from '@/contexts';
import type { Renderable } from '@/types';
import css from './Header.module.scss';

type Props = {
   controller: Renderable;
   disableEdit: () => void;
};

const NameChange = ({ controller, disableEdit }: Props): JSX.Element => {
   const [nameValue, setNameValue] = useState(controller.itemName);
   const { changeItemName } = useRenderables();

   const requestNameChange = (event: React.FormEvent): void => {
      event.preventDefault();
      changeItemName(nameValue, controller.id);
      disableEdit();
   };

   const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void =>
      setNameValue(event.target.value);
   const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => event.target.select();
   const handleClick = (event: React.MouseEvent): void => event.stopPropagation();

   const handleKeyPress = (event: React.KeyboardEvent): void => {
      if (event.keyCode === 27) disableEdit();
   };

   return (
      <form onSubmit={requestNameChange}>
         <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={true}
            className={css.nameChangeArea}
            onChange={handleInput}
            value={nameValue}
            onKeyDown={handleKeyPress}
            onBlur={disableEdit}
            onFocus={handleFocus}
            onClick={handleClick}
         />
      </form>
   );
};

export default NameChange;
