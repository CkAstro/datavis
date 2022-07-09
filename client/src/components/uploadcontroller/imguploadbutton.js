import { useState, useEffect } from 'react';
import { useModal } from '../../contexts/modal';
import style from './uploadcontroller.module.css';
import texHelper from '../../utils/texturehelper';
import api from '../../api';

const ModalContent = () => {
   const [ image, setImage ] = useState(null);

   useEffect(() => {
      api.getImageData('sample_data.png').then(data => setImage(URL.createObjectURL(data)));
   }, []);

   const handleUpload = async event => {
      event.preventDefault();
      const { files } = event.target;
      let uploadSuccess = [];
      let uploadFail = [];

      for (const file of files) {
         if (file.type.match(/image.*/)) {

            const formData = new FormData();
            formData.append('image', file);

            await api.postImageData(formData, file.name)
               .then(data => texHelper.loadTextureFromData(data, file.name))
               .then(() => uploadSuccess = uploadSuccess.concat(file.name))
               .catch(err => {
                  console.log(err);
                  uploadFail = uploadFail.concat(files[0].name);
               })
            ;
         } else {
            uploadFail = uploadFail.concat(file.name);
         }
      }

      if (uploadFail.length > 0) console.log('the following files failed to load:', uploadFail);
   }

   return <div className={style.modalContent}>
      <h1>Upload from Image</h1>

      <div className={style.container}>
         <label className={style.fileUploader}>
            <input type='file' multiple onInput={handleUpload}/>
            Browse...
         </label>
      </div>

      <p>The image uploader currently only supports N^3 image dimensions.</p> 
      
      <p>Data must be laid out into equal rows and columns of NxN slices from top-left to bottom-right (e.g. a 16x16 array of 256x256 images, or an 11x11 array of 120x120 images with the final 120x120 area left blank).</p>
      <p>To test this feature you may download and then upload the sample image below, which contains three sets of volumetric data </p>
      <a href={image} download='sample_data.png'><div>Sample Image</div></a>
   </div>;
}

const ImgUploadButton = () => {
   const { setModalContent } = useModal();

   return <div>
      <img className={null}
         title='Upload Data from Image'
         src={require('./img/imgupload.png')}
         onClick={() => setModalContent( <ModalContent/> )}
      />
   </div>;
}

export default ImgUploadButton;