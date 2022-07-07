import { useModal } from '../../../contexts/modal';
import '../display.css';

const LoadButton = () => {
   const { updateModal } = useModal();
   const displayModal = () => {
      updateModal(
         <>
            <h1>Load Session</h1>
            <p>You are attempting to load a session.</p>
            <p><b>Unfortunately, this feature is not yet enabled.</b></p>
         </>
      );
   }

   return <img className='disabled'
      title='Load Session'
      src={require('./img/load.png')}
      onClick={displayModal}
   />
}

export default LoadButton;