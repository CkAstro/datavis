import { useModal } from '../../contexts/modal';
import style from './modal.module.css';

const Modal = () => {
   const { modalParams, closeModal } = useModal();
   const handleClick = event => event.stopPropagation();

   return (
      <div className={`${style.modalContainer} ${modalParams.isActive ? style.active : ''}`} onClick={closeModal}>
         <div className={style.modal} onClick={handleClick}>
            {modalParams.content}
            <div className={style.closeButton} onClick={closeModal}>&times;</div>
         </div>
      </div>
   );
}

export default Modal;