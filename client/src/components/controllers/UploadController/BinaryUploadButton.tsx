import { useModal } from '@/contexts';
import { Button } from '@/components/elements';
import { binaryUploadIcon } from '@/assets/img';
import css from './UploadController.module.scss';

const BinaryUploadButton = () => {
   const { setModalContent } = useModal();
   const displayModal = (): void =>
      setModalContent(
         <div className={css.modalContent}>
            <h1>Upload from Binary</h1>
            <p>You are attempting to upload data from a binary file.</p>
            <p>
               <b>Unfortunately, this feature is not yet enabled.</b>
            </p>
         </div>
      );

   return <Button image={binaryUploadIcon} onClick={displayModal} />;
};

export default BinaryUploadButton;
