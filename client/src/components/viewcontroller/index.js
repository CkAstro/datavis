import { useCamera } from '../../contexts/camera';
import style from './viewcontroller.module.css';

const ViewAxisX = () => {
   const { handleSnap } = useCamera();
   
   return (
      <div className='changeView'
         title='Snap view to X'
         onClick={() => handleSnap(0, 'x')}
      ><div className='flexText'><span>View</span><span>X</span></div>
      </div>
   );
}

const ViewAxisY = () => {
   const { handleSnap } = useCamera();
   
   return (
      <div className='changeView'
         title='Snap view to Y'
         onClick={() => handleSnap(0, 'y')}
      ><div className='flexText'><span>View</span><span>Y</span></div>
      </div>
   );
}

const ViewAxisZ = () => {
   const { handleSnap } = useCamera();
   
   return (
      <div className='changeView'
         title='Snap view to Z'
         onClick={() => handleSnap(0, 'z')}
      ><div className='flexText'><span>View</span><span>Z</span></div>
      </div>
   );
}

const ViewController = () => {
   return (
      <div>
         <ViewAxisX/>
         <ViewAxisY/>
         <ViewAxisZ/>
      </div>
   );
}

export default ViewController;