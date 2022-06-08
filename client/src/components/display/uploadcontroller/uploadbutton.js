import { useModal } from '../../../contexts/modal';
import '../display.css';

const UploadButton = () => {
   const { updateModal } = useModal();
   const displayModal = () => {
      updateModal(
         <>
            <h1>Upload from Text</h1>
            <p>You are attempting to upload data from text.</p>
            <p><b>Unfortunately, this feature is not yet enabled.</b></p>
         </>
      );
   }

   return <img className='disabled'
      title='Upload Data from Text'
      src={require('./img/upload.png')}
      onClick={displayModal}
   />
}

export default UploadButton;