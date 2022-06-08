import { useCamera } from '../../../contexts/camera';
import '../display.css';

const ViewAxisX = () => {
   
   return (
      <div className='changeView'
         title='Snap view to X'
         onClick={null}
      ><div className='flexText'><span>View</span><span>X</span></div>
      </div>
   );
}

const ViewAxisY = () => {
   
   return (
      <div className='changeView'
         title='Snap view to Y'
         onClick={null}
      ><div className='flexText'><span>View</span><span>Y</span></div>
      </div>
   );
}

const ViewAxisZ = () => {
   
   return (
      <div className='changeView'
         title='Snap view to Z'
         onClick={null}
      ><div className='flexText'><span>View</span><span>Z</span></div>
      </div>
   );
}

const ViewController = () => {
   return (
      <>
         <ViewAxisX/>
         <ViewAxisY/>
         <ViewAxisZ/>
      </>
   );
}

export default ViewController;