import { useModal } from '../../contexts/modal';
import style from './sessioncontroller.module.css';

const LoadButton = () => {
   const { updateModal } = useModal();
   const displayModal = () => {
      updateModal(
         <div className={style.modalContent}>
            <h1>Load Session</h1>
            <p>You are attempting to load a session.</p>
            <p><b>Feature coming soon!</b></p>
         </div>
      );
   }

   return <div>
      <img className={style.disabled}
         title='Load Session'
         src={require('./img/load.png')}
         onClick={displayModal}
      />
   </div>;
}

export default LoadButton;