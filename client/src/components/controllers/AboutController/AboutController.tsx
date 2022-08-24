import { DropDown } from 'components/elements';
import AboutButton from './AboutButton';

export const AboutController = () => (
   <div>
      <DropDown baseItem={<AboutButton />} header="About" />
   </div>
);
