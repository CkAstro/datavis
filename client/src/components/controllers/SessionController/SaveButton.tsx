import { useModal } from '@/contexts';
import { Button } from '@/components/elements';
import { saveIcon } from '@/assets/img';
import SaveSessionForm from './SaveSessionForm';
import css from './SessionController.module.scss';

// saveButton opens a modal which allows user to save sessions
//    stored via cookie
const ModalContent = () => (
   <div className={css.modalContent}>
      <h1>Save Session</h1>
      <p>Save your session and start exactly where you left off!</p>
      <SaveSessionForm />
   </div>
);

const SaveButton = () => {
   const { setModalContent } = useModal();

   return (
      <Button image={saveIcon} enabled active onClick={() => setModalContent(<ModalContent />)} />
   );
};

export default SaveButton;
