import { Button, DropDown } from 'components/elements';
import UploadButton from './uploadbutton';
import ImgUploadButton from './imguploadbutton';
import BinaryUploadButton from './binaryuploadbutton';

const UploadController = () => (
   <div>
      <DropDown baseItem={<Button enabled active image={require('assets/img/upload_icon.png')}/>} header='Upload Data'>
         <DropDown baseItem={<ImgUploadButton/>} header='Image Format'/>
         <DropDown baseItem={<UploadButton/>} header='Text Format'/>
         <DropDown baseItem={<BinaryUploadButton/>} header='Binary Format'/>
      </DropDown>
   </div>
);

export default UploadController;