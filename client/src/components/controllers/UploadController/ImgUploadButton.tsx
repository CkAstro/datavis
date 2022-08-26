import { useState, useEffect } from 'react';
import { getImageData } from '@/api';
import { imgUploadIcon } from '@/assets/img';
import { Button } from '@/components/elements';
import { useModal } from '@/contexts';
import ImageUploader from './ImageUploader';
import css from './UploadController.module.scss';

const ModalContent = (): JSX.Element => {
   const [image, setImage] = useState<string | null>(null);

   // we will request sample image immediately, so we can use HTML5 download to download on link click
   useEffect(() => {
      getImageData('sample_data.png')
         .then((data) => setImage(URL.createObjectURL(data as Blob)))
         .catch((error) => console.log(error));
   }, []);

   return (
      <div className={css.modalContent}>
         <h1>Upload from Image</h1>

         <ImageUploader />
         <p>The image uploader currently only supports N^3 image dimensions.</p>
         <p>
            Data must be laid out into equal rows and columns of NxN slices from top-left to
            bottom-right (e.g. a 16x16 array of 256x256 images, or an 11x11 array of 120x120 images
            with the final 120x120 area left blank).
         </p>
         <p>
            To test this feature you may download and then upload the sample image below, which
            contains three sets of volumetric data{' '}
         </p>
         <a href={image!} download="sample_data.png">
            <div>Sample Image</div>
         </a>
      </div>
   );
};

const ImgUploadButton = (): JSX.Element => {
   const { setModalContent } = useModal();

   return (
      <Button
         image={imgUploadIcon}
         enabled={true}
         active={true}
         onClick={(): void => setModalContent(<ModalContent />)}
      />
   );
};

export default ImgUploadButton;
