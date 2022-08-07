import { useModal } from 'contexts';
import style from './modal.module.css';

function Modal() {
   const { modalParams, closeModal } = useModal();
   const handleClick = (event) => event.stopPropagation();

   return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
         className={`${style.modalContainer} ${
            modalParams.isActive ? style.active : ''
         }`}
         onClick={closeModal}
      >
         <div className={style.modal} onClick={handleClick}>
            {modalParams.content}
            <div className={style.closeButton} onClick={closeModal}>
               &times;
            </div>
         </div>
      </div>
   );
}

export default Modal;
