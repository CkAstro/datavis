import { useState } from 'react';
import Cookies from 'universal-cookie';
import { useModal, useCamera, useRenderables } from '@/contexts';
import css from './sessioncontroller.module.css';

// todo: need to also save data/colormap IDs so we can request from server
// todo: need to also store session info on server so we can request if cookies
//    are not available
const SaveSessionForm = () => {
   const defaultSessionName = 'session name...';
   const [sessionName, setSessionName] = useState(defaultSessionName);
   const { renderables } = useRenderables();
   const { options } = useCamera();
   const { closeModal } = useModal();

   const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => event.target.select();
   const handleInput = (event: React.FormEvent<HTMLInputElement>): void =>
      setSessionName(event.currentTarget.value);

   const handleSaveSession = (event: React.FormEvent) => {
      event.preventDefault();
      const cookies = new Cookies();
      const session = { renderables, options };
      cookies.set(sessionName, session, { path: '/', sameSite: 'strict' });
      closeModal();
   };

   return (
      <form className={css.nameContainer} onSubmit={handleSaveSession}>
         <input
            className={`${css.nameArea} ${sessionName === defaultSessionName ? css.disabled : ''}`}
            onChange={handleInput}
            value={sessionName}
            onFocus={handleFocus}
         />
         <button type="submit" className={css.saveButton} onClick={handleSaveSession}>
            save
         </button>
      </form>
   );
};

export default SaveSessionForm;
