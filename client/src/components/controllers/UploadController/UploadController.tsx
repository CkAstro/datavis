import { uploadIcon } from '@/assets/img';
import { Button, DropDown } from '@/components/elements';
import BinaryUploadButton from './BinaryUploadButton';
import ImgUploadButton from './ImgUploadButton';
import UploadButton from './UploadButton';

export const UploadController = (): JSX.Element => (
   <div>
      <DropDown
         baseItem={<Button enabled={true} active={true} image={uploadIcon} />}
         header="Upload Data"
      >
         <DropDown baseItem={<ImgUploadButton />} header="Image Format" />
         <DropDown baseItem={<UploadButton />} header="Text Format" />
         <DropDown baseItem={<BinaryUploadButton />} header="Binary Format" />
      </DropDown>
   </div>
);
