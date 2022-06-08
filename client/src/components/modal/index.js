import './index.css';

const Modal = ({ children, closeModal, isActive }) => {

   return (
      <div className={`modalContainer ${isActive ? 'active' : ''}`} onClick={closeModal}>
         <div className='modal'>
            {children}
         </div>
      </div>
   );
}

export default Modal;