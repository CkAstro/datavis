import { binaryUploadIcon } from '@/assets/img';
import { Button } from '@/components/elements';
import { useModal } from '@/contexts';
import css from './UploadController.module.scss';

const BinaryUploadButton = (): JSX.Element => {
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
