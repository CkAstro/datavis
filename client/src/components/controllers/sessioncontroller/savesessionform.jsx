import { useState } from 'react';
import { useModal, useCamera, useRenderables } from 'contexts';
import Cookies from 'universal-cookie';
import style from './sessioncontroller.module.css';

// todo: need to also save data/colormap IDs so we can request from server
// todo: need to also store session info on server so we can request if cookies
//    are not available
function SaveSessionForm() {
   const defaultSessionName = 'session name...';
   const [sessionName, setSessionName] = useState(defaultSessionName);
   const { renderables } = useRenderables();
   const { options } = useCamera();
   const { closeModal } = useModal();

   const handleInput = (event) => setSessionName(event.target.value);
   const handleFocus = (event) => event.target.select();

   const handleSaveSession = (event) => {
      event.preventDefault();
      const cookies = new Cookies();
      const session = { renderables, options };
      cookies.set(sessionName, session, { path: '/', sameSite: 'strict' });
      closeModal();
   };

   return (
      <form className={style.nameContainer} onSubmit={handleSaveSession}>
         <input
            className={`${style.nameArea} ${
               sessionName === defaultSessionName ? style.disabled : ''
            }`}
            onChange={handleInput}
            value={sessionName}
            onFocus={handleFocus}
         />
         <button
            type="submit"
            className={style.saveButton}
            onClick={handleSaveSession}
         >
            save
         </button>
      </form>
   );
}

export default SaveSessionForm;
