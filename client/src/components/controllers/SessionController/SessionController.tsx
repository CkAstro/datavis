import { DropDown } from '@/components/elements';
import LoadButton from './LoadButton';
import SaveButton from './SaveButton';

export const SessionController = (): JSX.Element => (
   <div>
      <DropDown baseItem={<SaveButton />} header="Save Session" />
      <DropDown baseItem={<LoadButton />} header="Load Session" />
   </div>
);
