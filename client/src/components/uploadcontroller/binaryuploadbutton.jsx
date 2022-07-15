import { useModal } from 'contexts/modal';
import style from './uploadcontroller.module.css';

const BinaryUploadButton = () => {
   const { setModalContent } = useModal();
   const displayModal = () => {
      setModalContent(
         <div className={style.modalContent}>
            <h1>Upload from Binary</h1>
            <p>You are attempting to upload data from a binary file.</p>
            <p><b>Unfortunately, this feature is not yet enabled.</b></p>
         </div>
      );
   }

   return <div>
      <img className={style.disabled}
         title='Upload Data from Binary'
         src={require('assets/img/binary_upload_icon.png')}
         onClick={displayModal}
      />
   </div>;
}

export default BinaryUploadButton;