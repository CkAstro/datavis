import { DropDown } from 'components/elements';
import AboutButton from './aboutbutton';

function AboutController() {
   return (
      <div>
         <DropDown baseItem={<AboutButton />} header="About" />
      </div>
   );
}

export default AboutController;
