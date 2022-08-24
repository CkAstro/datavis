import { texHelper } from '@/utils';
import { postImageData } from '@/api';
import css from './UploadController.module.css';

// TODO : add feedback on upload (and upload fail)
const ImageUploader = () => {
   const handleUpload = async (event: React.FormEvent<HTMLInputElement>) => {
      event.preventDefault();
      const { files } = event.currentTarget;
      let uploadSuccess: string[] = [];
      let uploadFail: string[] = [];

      [...files!].forEach((file) => {
         if (file.type.match(/image.*/)) {
            const formData = new FormData();
            formData.append('image', file);

            postImageData(formData, file.name)
               .then((data) => texHelper.loadTextureFromData(data, file.name))
               .then(() => {
                  uploadSuccess = uploadSuccess.concat(file.name);
               })
               .catch((err) => {
                  console.log(err);
                  uploadFail = uploadFail.concat(files![0].name);
               });
         } else {
            uploadFail = uploadFail.concat(file.name);
         }
      });

      if (uploadFail.length > 0) console.log('the following files failed to load:', uploadFail);
   };

   return (
      <div className={css.container}>
         {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
         <label className={css.fileUploader}>
            Browse...
            <input type="file" multiple onInput={handleUpload} />
         </label>
      </div>
   );
};

export default ImageUploader;
