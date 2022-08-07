import { useModal } from 'contexts';
import { Button } from 'components/elements';
import { saveIcon } from 'assets/img';
import SaveSessionForm from './savesessionform';
import style from './sessioncontroller.module.css';

// saveButton opens a modal which allows user to save sessions
//    stored via cookie
function ModalContent() {
   return (
      <div className={style.modalContent}>
         <h1>Save Session</h1>
         <p>Save your session and start exactly where you left off!</p>
         <SaveSessionForm />
      </div>
   );
}

function SaveButton() {
   const { setModalContent } = useModal();

   return (
      <Button
         image={saveIcon}
         enabled
         active
         onClick={() => setModalContent(<ModalContent />)}
      />
   );
}

export default SaveButton;
