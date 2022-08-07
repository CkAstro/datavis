import { useModal } from 'contexts';
import { Button } from 'components/elements';
import { binaryUploadIcon } from 'assets/img';
import style from './uploadcontroller.module.css';

function BinaryUploadButton() {
   const { setModalContent } = useModal();
   const displayModal = () =>
      setModalContent(
         <div className={style.modalContent}>
            <h1>Upload from Binary</h1>
            <p>You are attempting to upload data from a binary file.</p>
            <p>
               <b>Unfortunately, this feature is not yet enabled.</b>
            </p>
         </div>
      );

   return <Button image={binaryUploadIcon} onClick={displayModal} />;
}

export default BinaryUploadButton;
