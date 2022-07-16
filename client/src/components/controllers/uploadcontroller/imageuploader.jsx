import { texHelper } from 'utils';
import api from 'api';
import style from './uploadcontroller.module.css';

// TODO : add feedback on upload (and upload fail)
const ImageUploader = () => {
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

   return (
      <div className={style.container}>
         <label className={style.fileUploader}>
            <input type='file' multiple onInput={handleUpload}/>
            Browse...
         </label>
      </div>
   );
}

export default ImageUploader;