import { useModal } from 'contexts/modal';
import style from './uploadcontroller.module.css';

const UploadButton = () => {
   const { setModalContent } = useModal();
   const displayModal = () => {
      setModalContent(
         <div className={style.modalContent}>
            <h1>Upload from Text</h1>
            <p>You are attempting to upload data from text.</p>
            <p><b>Unfortunately, this feature is not yet enabled.</b></p>
         </div>
      );
   }

   return <div>
      <img className={style.disabled}
         title='Upload Data from Text'
         src={require('assets/img/upload_icon.png')}
         onClick={displayModal}
      />
   </div>;
}

export default UploadButton;