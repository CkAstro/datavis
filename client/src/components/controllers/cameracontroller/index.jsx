import { DropDown } from 'components/elements';
import CompareButton from './comparebutton';
import LinkedButton from './linkedbutton';

function CameraController() {
   return (
      <div>
         <DropDown baseItem={<CompareButton />} header="Compare Mode" />
         <DropDown baseItem={<LinkedButton />} header="Link Cameras" />
      </div>
   );
}

export default CameraController;
