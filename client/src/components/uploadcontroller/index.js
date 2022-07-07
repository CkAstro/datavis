import UploadButton from './uploadbutton';
import ImgUploadButton from './imguploadbutton';
import BinaryUploadButton from './binaryuploadbutton';

const UploadController = () => {
   return (
      <div>
         <UploadButton/>
         <ImgUploadButton/>
         <BinaryUploadButton/>
      </div>
   );
}

export default UploadController;