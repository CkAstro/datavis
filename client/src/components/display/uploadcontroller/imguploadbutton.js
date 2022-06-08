import { useModal } from '../../../contexts/modal';
import '../display.css';

const ImgUploadButton = () => {
   const { updateModal } = useModal();
   const displayModal = () => {
      updateModal(
         <>
            <h1>Upload from Image</h1>
            <p>You are attempting to upload data from an image.</p>
            <p><b>Unfortunately, this feature is not yet enabled.</b></p>
         </>
      );
   }

   return <img className='disabled'
      title='Upload Data from Image'
      src={require('./img/imgupload.png')}
      onClick={displayModal}
   />
}

export default ImgUploadButton;