import { useModal } from '../../../contexts/modal';
import '../display.css';

const SaveButton = () => {
   const { updateModal } = useModal();
   const displayModal = () => {
      updateModal(
         <>
            <h1>Save Session</h1>
            <p>You are attempting to save your session.</p>
            <p><b>Unfortunately, this feature is not yet enabled.</b></p>
         </>
      );
   }

   return <img className='disabled'
      title='Save Session'
      src={require('./img/save.png')}
      onClick={() => displayModal()}
   />
}

export default SaveButton;