import { useModal } from 'contexts';
import { Button } from 'components/elements';
import SaveSessionForm from './savesessionform';
import style from './sessioncontroller.module.css';

// saveButton opens a modal which allows user to save sessions 
//    stored via cookie
const ModalContent = () => (
   <div className={style.modalContent}>
      <h1>Save Session</h1>
      <p>Save your session and start exactly where you left off!</p>
      <SaveSessionForm/>
   </div>
);

const SaveButton = () => {
   const { setModalContent } = useModal();

   return (
      <Button 
         image={require('assets/img/save_icon.png')} 
         enabled
         active
         onClick={() => setModalContent(<ModalContent/>)}
      />
   );
}

export default SaveButton;