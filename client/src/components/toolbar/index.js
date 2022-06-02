import CameraController from './cameracontroller';
import ItemCreator from './itemcreator';
import ItemDisplay from '../itemdisplay';
import './toolbar.css';

const Toolbar = () => {
   return (
      <div className='toolbarArea'>
         <p>Toolbar</p>
         <div className='optionsArea'>
            <CameraController/>
            <ItemCreator/>
         </div>
         <p>Items</p>
         <ItemDisplay/>
      </div>
   );
}

export default Toolbar;