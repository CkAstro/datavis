import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useCamera, useRenderables } from '@/contexts';
import type { Renderable, CameraOptions } from '@/types';
import css from './SessionController.module.scss';

const SessionList = (): JSX.Element => {
   const [sessions, setSessions] = useState<Record<string, unknown>>({});
   const [sessionArray, setSessionArray] = useState<React.ReactNode[]>([]);
   const [deleteQueue, setDeleteQueue] = useState<string | null>(null);

   // grab all cookies on init
   useEffect(() => {
      const cookies = new Cookies();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setSessions(cookies.getAll());
   }, []);

   const { setAllRenderables } = useRenderables();
   const { setAllOptions } = useCamera();

   const loadSession = (sessionName: string): void => {
      const { renderables, options }: { renderables: Renderable[]; options: CameraOptions } =
         sessions[sessionName] as { renderables: Renderable[]; options: CameraOptions };
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
      if (sessionName !== deleteQueue) return void setDeleteQueue(sessionName);
      return void deleteSession(sessionName);
   };

   useEffect(() => {
      const newSessionArray = Object.keys(sessions).map((session) => (
         <div key={session} className={`noselect ${css.session}`}>
            <button
               className={css.sessionName}
               title={session}
               onClick={(): void => loadSession(session)}
            >
               {session}
            </button>
            <button className={css.deleteButton} onClick={(): void => queueDeleteSession(session)}>
               &times;
            </button>
            <div className={`${css.confirmDelete} ${session === deleteQueue ? css.active : ''}`}>
               click &apos;&times;&apos; again to confirm delete
            </div>
         </div>
      ));
      setSessionArray(newSessionArray);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [sessions]);

   if (Object.keys(sessions).length === 0) return <div>No sessions found</div>;

   return <div className={css.sessionContainer}>{sessionArray}</div>;
};

export default SessionList;
