import { useModal } from '../../contexts/modal';
import style from './uploadcontroller.module.css';

const BinaryUploadButton = () => {
   const { updateModal } = useModal();
   const displayModal = () => {
      updateModal(
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
         src={require('./img/binaryupload.png')}
         onClick={displayModal}
      />
   </div>;
}

export default BinaryUploadButton;