import { DropDown } from 'components/elements';
import SaveButton from './savebutton';
import LoadButton from './loadbutton';

function SessionController() {
   return (
      <div>
         <DropDown baseItem={<SaveButton />} header="Save Session" />
         <DropDown baseItem={<LoadButton />} header="Load Session" />
      </div>
   );
}

export default SessionController;
