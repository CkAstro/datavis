import { DropDown } from 'components/elements';
import AboutButton from './aboutbutton';

const AboutController = () => (
   <div>
      <DropDown baseItem={<AboutButton/>} header='About'/>
   </div>
);

export default AboutController;