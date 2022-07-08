import { useState, useEffect } from 'react';
import { useModal } from '../../contexts/modal';
import { useRenderables } from '../../contexts/renderables';
import { useCamera } from '../../contexts/camera';
import Cookies from 'universal-cookie';
import style from './sessioncontroller.module.css';

const ModalContent = () => {
   const [ sessions, setSessions ] = useState({});
   const [ deleteQueue, setDeleteQueue ] = useState(null);
   const { setAllRenderables } = useRenderables();
   const { setAllOptions } = useCamera();

   useEffect(() => {
      const cookies = new Cookies;
      setSessions(cookies.getAll());
   }, []);

   const buildSessions = () => {
      if (!sessions) return null;
      let sessionMap = [];
      for (const session in sessions) {
         sessionMap = sessionMap.concat(
            <div className={`noselect ${style.session}`} key={session}>
               <div className={style.sessionName} title={session}  onClick={() => loadSession(session)}><div>{session}</div></div>
               <div className={style.deleteButton} onClick={() => queueDelete(session)}><div>&times;</div></div>
               <div className={`${style.confirmDelete} ${session === deleteQueue ? style.active : null}`}>click '&times;' again to confirm delete</div>
            </div>
         );
      }
      return sessionMap;
   }

   const loadSession = sessionName => {
      const { renderables, options } = sessions[sessionName];
      setAllRenderables(renderables);
      setAllOptions(options);
      setDeleteQueue(null);
   }

   const queueDelete = sessionName => {
      if (sessionName !== deleteQueue) return setDeleteQueue(sessionName);
      return deleteSession(sessionName);
   }

   const deleteSession = sessionName => {
      const cookies = new Cookies;
      cookies.remove(sessionName, {path: '/'});

      const newSessions = { ...sessions };
      delete newSessions[sessionName];
      setSessions(newSessions);
      setDeleteQueue(null);
   }

   return <div className={style.modalContent}>
      <h1>Load Session</h1>
      <p>Please choose a session to load.</p>
      <div className={style.sessionContainer}>{buildSessions()}</div>
   </div>;
}

const LoadButton = () => {
   const { updateModal } = useModal();
   const displayModal = () => {
      updateModal( <ModalContent/> );
   }

   return <div>
      <img className={null}
         title='Load Session'
         src={require('./img/load.png')}
         onClick={displayModal}
      />
   </div>;
}

export default LoadButton;