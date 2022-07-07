import { useModal } from '../../../contexts/modal';
import '../display.css';

const BinaryUploadButton = () => {
   const { updateModal } = useModal();
   const displayModal = () => {
      updateModal(
         <>
            <h1>Upload from Binary</h1>
            <p>You are attempting to upload data from a binary file.</p>
            <p><b>Unfortunately, this feature is not yet enabled.</b></p>
         </>
      );
   }

   return <img className='disabled'
      title='Upload Data from Binary'
      src={require('./img/binaryupload.png')}
      onClick={displayModal}
   />
}

export default BinaryUploadButton;