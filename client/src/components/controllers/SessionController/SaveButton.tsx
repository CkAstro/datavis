import { saveIcon } from '@/assets/img';
import { Button } from '@/components/elements';
import { useModal } from '@/contexts';
import SaveSessionForm from './SaveSessionForm';
import css from './SessionController.module.scss';

// saveButton opens a modal which allows user to save sessions
//    stored via cookie
const ModalContent = (): JSX.Element => (
   <div className={css.modalContent}>
      <h1>Save Session</h1>
      <p>Save your session and start exactly where you left off!</p>
      <SaveSessionForm />
   </div>
);

const SaveButton = (): JSX.Element => {
   const { setModalContent } = useModal();

   return (
      <Button
         image={saveIcon}
         enabled={true}
         active={true}
         onClick={(): void => setModalContent(<ModalContent />)}
      />
   );
};

export default SaveButton;
