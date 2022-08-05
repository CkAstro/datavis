import { DropDown } from 'components/elements';
import CompareButton from './comparebutton';
import LinkedButton from './linkedbutton';

const CameraController = () => (
   <div>
      <DropDown baseItem={<CompareButton/>} header='Compare Mode'/>
      <DropDown baseItem={<LinkedButton/>} header='Link Cameras'/>
   </div>
);

export default CameraController;