import UploadButton from './uploadbutton';
import ImgUploadButton from './imguploadbutton';
import BinaryUploadButton from './binaryuploadbutton';

const UploadController = () => (
   <div>
      <ImgUploadButton/>
      <UploadButton/>
      <BinaryUploadButton/>
   </div>
);

export default UploadController;