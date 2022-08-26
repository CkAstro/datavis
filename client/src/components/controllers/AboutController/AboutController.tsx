import { DropDown } from '@/components/elements';
import AboutButton from './AboutButton';

export const AboutController = (): JSX.Element => (
   <div>
      <DropDown baseItem={<AboutButton />} header="About" />
   </div>
);
