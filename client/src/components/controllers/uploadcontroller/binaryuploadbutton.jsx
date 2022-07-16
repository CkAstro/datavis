import { useModal } from 'contexts';
import { Button } from 'components/elements';
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

   return (
      <Button 
         image={require('assets/img/binary_upload_icon.png')} 
         hoverText='Upload Data from Binary' 
         onClick={displayModal}
      />
   );
}

export default BinaryUploadButton;