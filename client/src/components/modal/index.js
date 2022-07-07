import style from './modal.module.css';

const Modal = ({ children, closeModal, isActive }) => {
   const handleClick = event => event.stopPropagation();

   return (
      <div className={`${style.modalContainer} ${isActive ? style.active : ''}`} onClick={closeModal}>
         <div className={style.modal} onClick={handleClick}>
            {children}
         </div>
      </div>
   );
}

export default Modal;