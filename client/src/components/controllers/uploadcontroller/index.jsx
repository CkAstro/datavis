import { Button, DropDown } from 'components/elements';
import { uploadIcon } from 'assets/img';
import UploadButton from './uploadbutton';
import ImgUploadButton from './imguploadbutton';
import BinaryUploadButton from './binaryuploadbutton';

function UploadController() {
   return (
      <div>
         <DropDown
            baseItem={<Button enabled active image={uploadIcon} />}
            header="Upload Data"
         >
            <DropDown baseItem={<ImgUploadButton />} header="Image Format" />
            <DropDown baseItem={<UploadButton />} header="Text Format" />
            <DropDown
               baseItem={<BinaryUploadButton />}
               header="Binary Format"
            />
         </DropDown>
      </div>
   );
}

export default UploadController;
