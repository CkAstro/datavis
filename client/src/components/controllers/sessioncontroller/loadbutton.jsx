import { useModal } from 'contexts';
import { Button } from 'components/elements';
import SessionList from './sessionlist';
import style from './sessioncontroller.module.css';

// loadButton opens a modal which allows user to load sessions stored via cookie
// todo: need to also load data/colormap IDs so we can request from server
// todo: need to also store session info on server so we can request if cookies
//    are not available
const ModalContent = () => (
   <div className={style.modalContent}>
      <h1>Load Session</h1>
      <p>Please choose a session to load.</p>
      <SessionList/>
   </div>
);

const LoadButton = () => {
   const { setModalContent } = useModal();

   return (
      <Button 
         image={require('assets/img/load_icon.png')} 
         enabled
         active
         onClick={() => setModalContent(<ModalContent/>)}
      />
   );
}

export default LoadButton;