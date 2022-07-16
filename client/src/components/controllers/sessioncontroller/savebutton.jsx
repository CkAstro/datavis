import { useState } from 'react';
import { useModal, useCamera, useRenderables } from 'contexts';
import { Button } from 'components/elements';
import Cookies from 'universal-cookie';
import style from './sessioncontroller.module.css';


// saveButton opens a modal which allows user to save sessions stored via cookie
// todo: need to also save data/colormap IDs so we can request from server
// todo: need to also store session info on server so we can request if cookies
//    are not available
const ModalContent = () => {
   const defaultSessionName = 'session name...';
   const [ sessionName, setSessionName ] = useState(defaultSessionName);
   const { renderables } = useRenderables();
   const { options } = useCamera();
   const { closeModal } = useModal();

   const handleInput = event => setSessionName(event.target.value);
   const handleFocus = event => event.target.select();

   const handleSave = event => {
      event.preventDefault();
      const cookies = new Cookies;
      const session = {renderables, options};
      cookies.set(sessionName, session, {path: '/', sameSite: 'strict'});
      closeModal();
   }

   return (
      <div className={style.modalContent}>
         <h1>Save Session</h1>
         <p>Save your session and start exactly where you left off!</p>
         <form className={style.nameContainer} onSubmit={handleSave}>
            <input autoFocus className={`${style.nameArea} ${sessionName === defaultSessionName ? style.disabled : null}`}
               onChange={handleInput}
               value={sessionName}
               onFocus={handleFocus}
            />
            <div className={style.saveButton} onClick={handleSave}>save</div>
         </form>
      </div>
   );
}

const SaveButton = () => {
   const { setModalContent } = useModal();

   return (
      <Button 
         image={require('assets/img/save_icon.png')} 
         hoverText='Save Session' 
         enabled
         active
         onClick={() => setModalContent( <ModalContent/> )}
      />
   );
}

export default SaveButton;