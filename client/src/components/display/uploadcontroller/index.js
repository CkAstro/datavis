import UploadButton from './uploadbutton';
import ImgUploadButton from './imguploadbutton';
import BinaryUploadButton from './binaryuploadbutton';
import '../display.css';

const UploadController = () => {
   return (
      <>
         <UploadButton/>
         <ImgUploadButton/>
         <BinaryUploadButton/>
      </>
   );
}

export default UploadController;