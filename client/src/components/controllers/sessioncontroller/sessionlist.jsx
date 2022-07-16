import { useState, useEffect } from 'react';
import { useCamera, useRenderables } from 'contexts';
import Cookies from 'universal-cookie';
import style from './sessioncontroller.module.css';

const SessionList = () => {
   const [ sessions, setSessions ] = useState({});
   const [ sessionArray, setSessionArray ] = useState([]);
   const [ deleteQueue, setDeleteQueue ] = useState(null);

   // grab all cookies on init
   useEffect(() => {
      const cookies = new Cookies;
      setSessions(cookies.getAll());
   }, []);

   const { setAllRenderables } = useRenderables();
   const { setAllOptions } = useCamera();

   const loadSession = sessionName => {
      const { renderables, options } = sessions[sessionName];
      setAllRenderables(renderables);
      setAllOptions(options);
      setDeleteQueue(null);
   }

   // calling this once queues; calling twice in a row deletes
   const queueDeleteSession = sessionName => {
      if (sessionName !== deleteQueue) return setDeleteQueue(sessionName);
      return deleteSession(sessionName);
   }

   // delete session and remove from cookies
   const deleteSession = sessionName => {
      const cookies = new Cookies;
      cookies.remove(sessionName, {path: '/'});

      const newSessions = { ...sessions };
      delete newSessions[sessionName];
      setSessions(newSessions);
      setDeleteQueue(null);
   }

   useEffect(() => {
      let newSessionArray = [];
      for (const session in sessions) {
         newSessionArray = newSessionArray.concat(
            <div key={session} className={`noselect ${style.session}`}>
               <div className={style.sessionName} title={session} onClick={() => loadSession(session)}>
                  {session}
               </div>
               <div className={style.deleteButton} onClick={() => queueDeleteSession(session)}>
                  &times;
               </div>
               <div className={`${style.confirmDelete} ${session === deleteQueue ? style.active : ''}`}>
                  click '&times;' again to confirm delete
               </div>
            </div>
         );
      }
      setSessionArray(newSessionArray);
   }, [sessions]);

   if (!sessions || Object.keys(sessions).length === 0) return (
      <div>No sessions found</div>
   );

   return <div className={style.sessionContainer}>{sessionArray}</div>;
}

export default SessionList;