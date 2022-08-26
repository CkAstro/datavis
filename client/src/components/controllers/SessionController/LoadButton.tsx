import { loadIcon } from '@/assets/img';
import { Button } from '@/components/elements';
import { useModal } from '@/contexts';
import SessionList from './SessionList';
import css from './SessionController.module.scss';

// loadButton opens a modal which allows user to load sessions stored via cookie
// todo: need to also load data/colormap IDs so we can request from server
// todo: need to also store session info on server so we can request if cookies
//    are not available
const ModalContent = (): JSX.Element => (
   <div className={css.modalContent}>
      <h1>Load Session</h1>
      <p>Please choose a session to load.</p>
      <SessionList />
   </div>
);

const LoadButton = (): JSX.Element => {
   const { setModalContent } = useModal();

   return (
      <Button
         image={loadIcon}
         enabled={true}
         active={true}
         onClick={(): void => setModalContent(<ModalContent />)}
      />
   );
};

export default LoadButton;
