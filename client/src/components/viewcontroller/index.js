import { useCamera } from '../../contexts/camera';
import style from './viewcontroller.module.css';

const ViewAxisX = () => {
   const { snapCamera } = useCamera();
   
   return (
      <div className={style.changeView}
         title='Snap view to X'
         onClick={() => snapCamera(0, 'x')}
      ><div className={style.flexText}><span>View</span><span>X</span></div>
      </div>
   );
}

const ViewAxisY = () => {
   const { snapCamera } = useCamera();
   
   return (
      <div className={style.changeView}
         title='Snap view to Y'
         onClick={() => snapCamera(0, 'y')}
      ><div className={style.flexText}><span>View</span><span>Y</span></div>
      </div>
   );
}

const ViewAxisZ = () => {
   const { snapCamera } = useCamera();
   
   return (
      <div className={style.changeView}
         title='Snap view to Z'
         onClick={() => snapCamera(0, 'z')}
      ><div className={style.flexText}><span>View</span><span>Z</span></div>
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