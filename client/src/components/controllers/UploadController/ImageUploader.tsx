import { postImageData } from '@/api';
import { texHelper } from '@/utils';
import css from './UploadController.module.scss';

// TODO : add feedback on upload (and upload fail)
const ImageUploader = (): JSX.Element => {
   // eslint-disable-next-line @typescript-eslint/require-await
   const handleUpload = async (event: React.FormEvent<HTMLInputElement>): Promise<void> => {
      event.preventDefault();
      const { files } = event.currentTarget;
      let uploadSuccess: string[] = [];
      let uploadFail: string[] = [];

      [...files!].forEach((file) => {
         if (file.type.match(/image.*/) !== null) {
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
         <label className={css.fileUploader}>
            Browse...
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <input type="file" multiple={true} onInput={handleUpload} />
         </label>
      </div>
   );
};

export default ImageUploader;
