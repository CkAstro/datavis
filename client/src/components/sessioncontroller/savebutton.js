import { useModal } from '../../contexts/modal';
import style from './sessioncontroller.module.css';

const SaveButton = () => {
   const { updateModal } = useModal();
   const displayModal = () => {
      updateModal(
         <div className={style.modalContent}>
            <h1>Save Session</h1>
            <p>You are attempting to save your session.</p>
            <p><b>Unfortunately, this feature is not yet enabled.</b></p>
         </div>
      );
   }

   return <div>
      <img className={style.disabled}
         title='Save Session'
         src={require('./img/save.png')}
         onClick={() => displayModal()}
      />
   </div>;
}

export default SaveButton;