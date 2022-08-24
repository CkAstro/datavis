import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useCamera, useRenderables } from '@/contexts';
import css from './SessionController.module.scss';

const SessionList = () => {
   const [sessions, setSessions] = useState<any>({});
   const [sessionArray, setSessionArray] = useState<React.ReactNode[]>([]);
   const [deleteQueue, setDeleteQueue] = useState<string | null>(null);

   // grab all cookies on init
   useEffect(() => {
      const cookies = new Cookies();
      setSessions(cookies.getAll());
   }, []);

   const { setAllRenderables } = useRenderables();
   const { setAllOptions } = useCamera();

   const loadSession = (sessionName: string): void => {
      const { renderables, options } = sessions[sessionName];
      setAllRenderables(renderables);
      setAllOptions(options);
      setDeleteQueue(null);
   };

   // delete session and remove from cookies
   const deleteSession = (sessionName: string): void => {
      const cookies = new Cookies();
      cookies.remove(sessionName, { path: '/' });

      const newSessions = { ...sessions };
      delete newSessions[sessionName];
      setSessions(newSessions);
      setDeleteQueue(null);
   };

   // calling this once queues; calling twice in a row deletes
   const queueDeleteSession = (sessionName: string): void => {
      if (sessionName !== deleteQueue) return setDeleteQueue(sessionName);
      return deleteSession(sessionName);
   };

   useEffect(() => {
      const newSessionArray = Object.keys(sessions).map((session) => (
         <div key={session} className={`noselect ${css.session}`}>
            <div className={css.sessionName} title={session} onClick={() => loadSession(session)}>
               {session}
            </div>
            <div className={css.deleteButton} onClick={() => queueDeleteSession(session)}>
               &times;
            </div>
            <div className={`${css.confirmDelete} ${session === deleteQueue ? css.active : ''}`}>
               click &apos;&times;&apos; again to confirm delete
            </div>
         </div>
      ));
      setSessionArray(newSessionArray);
   }, [sessions]);

   if (!sessions || Object.keys(sessions).length === 0) return <div>No sessions found</div>;

   return <div className={css.sessionContainer}>{sessionArray}</div>;
};

export default SessionList;
