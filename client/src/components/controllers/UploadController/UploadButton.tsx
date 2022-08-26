import { uploadIcon } from '@/assets/img';
import { Button } from '@/components/elements';
import { useModal } from '@/contexts';
import css from './UploadController.module.scss';

const UploadButton = (): JSX.Element => {
   const { setModalContent } = useModal();
   const displayModal = (): void =>
      setModalContent(
         <div className={css.modalContent}>
            <h1>Upload from Text</h1>
            <p>You are attempting to upload data from text.</p>
            <p>
               <b>Unfortunately, this feature is not yet enabled.</b>
            </p>
         </div>
      );

   return <Button image={uploadIcon} onClick={displayModal} />;
};

export default UploadButton;
