import { DropDown } from '@/components/elements';
import CompareButton from './CompareButton';
import LinkedButton from './LinkedButton';

export const CameraController = (): JSX.Element => (
   <div>
      <DropDown baseItem={<CompareButton />} header="Compare Mode" />
      <DropDown baseItem={<LinkedButton />} header="Link Cameras" />
   </div>
);
