import { useState } from 'react';
import { useModal } from '../../contexts/modal';
import { useRenderables } from '../../contexts/renderables';
import { useCamera } from '../../contexts/camera';
import Cookies from 'universal-cookie';
import style from './sessioncontroller.module.css';

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

   return <div className={style.modalContent}>
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
   </div>;
}

const SaveButton = () => {
   const { setModalContent } = useModal();

   return <div>
      <img className={null}
         title='Save Session'
         src={require('./img/save.png')}
         onClick={() => setModalContent( <ModalContent/> )}
      />
   </div>;
}

export default SaveButton;