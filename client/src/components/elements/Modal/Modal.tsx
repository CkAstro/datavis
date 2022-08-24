import { useModal } from '@/contexts';
import css from './Modal.module.scss';

export const Modal = () => {
   const { modalParams, closeModal } = useModal();
   const handleClick = (event: React.MouseEvent) => event.stopPropagation();

   return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
         className={`${css.modalContainer} ${modalParams.isActive ? css.active : ''}`}
         onClick={closeModal}
      >
         <div className={css.modal} onClick={handleClick}>
            {modalParams.content}
            <div className={css.closeButton} onClick={closeModal}>
               &times;
            </div>
         </div>
      </div>
   );
};
