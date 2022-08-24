import { Button, DropDown } from '@/components/elements';
import { uploadIcon } from '@/assets/img';
import UploadButton from './UploadButton';
import ImgUploadButton from './ImgUploadButton';
import BinaryUploadButton from './BinaryUploadButton';

export const UploadController = () => (
   <div>
      <DropDown baseItem={<Button enabled active image={uploadIcon} />} header="Upload Data">
         <DropDown baseItem={<ImgUploadButton />} header="Image Format" />
         <DropDown baseItem={<UploadButton />} header="Text Format" />
         <DropDown baseItem={<BinaryUploadButton />} header="Binary Format" />
      </DropDown>
   </div>
);
