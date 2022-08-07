import { useModal } from 'contexts';
import { Button } from 'components/elements';
import { uploadIcon } from 'assets/img';
import style from './uploadcontroller.module.css';

function UploadButton() {
   const { setModalContent } = useModal();
   const displayModal = () =>
      setModalContent(
         <div className={style.modalContent}>
            <h1>Upload from Text</h1>
            <p>You are attempting to upload data from text.</p>
            <p>
               <b>Unfortunately, this feature is not yet enabled.</b>
            </p>
         </div>
      );

   return <Button image={uploadIcon} onClick={displayModal} />;
}

export default UploadButton;
