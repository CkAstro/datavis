import { useState, useEffect } from 'react';
import { useModal } from 'contexts';
import { Button } from 'components/elements';
import ImageUploader from './imageuploader';
import api from 'api';
import style from './uploadcontroller.module.css';

const ModalContent = () => {
   const [ image, setImage ] = useState(null);

   // we will request sample image immediately, so we can use HTML5 download to download on link click 
   useEffect(() => {
      api.getImageData('sample_data.png').then(data => setImage(URL.createObjectURL(data)));
   }, []);

   return (
      <div className={style.modalContent}>
         <h1>Upload from Image</h1>

         <ImageUploader/>
         <p>The image uploader currently only supports N^3 image dimensions.</p> 
         
         <p>Data must be laid out into equal rows and columns of NxN slices from top-left to bottom-right (e.g. a 16x16 array of 256x256 images, or an 11x11 array of 120x120 images with the final 120x120 area left blank).</p>
         <p>To test this feature you may download and then upload the sample image below, which contains three sets of volumetric data </p>
         <a href={image} download='sample_data.png'><div>Sample Image</div></a>
      </div>
   );
}

const ImgUploadButton = () => {
   const { setModalContent } = useModal();

   return (
      <Button 
         image={require('assets/img/img_upload_icon.png')} 
         hoverText='Upload Data from Image' 
         enabled
         active
         onClick={() => setModalContent(<ModalContent/>)}
      />
   );
}

export default ImgUploadButton;