import style from './modal.module.css';

const Modal = ({ children, closeModal, isActive }) => {

   return (
      <div className={`${style.modalContainer} ${isActive ? style.active : ''}`} onClick={closeModal}>
         <div className={style.modal}>
            {children}
         </div>
      </div>
   );
}

export default Modal;