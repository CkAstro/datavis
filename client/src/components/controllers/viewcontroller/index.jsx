import { useCamera } from 'contexts';
import style from './viewcontroller.module.css';
// clicking buttons will snap to appropriate axis

const ViewAxisX = () => {
   const { snapCamera } = useCamera();
   
   return (
      <div className={style.changeView}
         title='Snap view to X'
         onClick={() => snapCamera('x')}
      >
         <div className={style.flexText}>
            <span>View</span><span>X</span>
         </div>
      </div>
   );
}

const ViewAxisY = () => {
   const { snapCamera } = useCamera();
   
   return (
      <div className={style.changeView}
         title='Snap view to Y'
         onClick={() => snapCamera('y')}
      >
         <div className={style.flexText}>
            <span>View</span><span>Y</span>
         </div>
      </div>
   );
}

const ViewAxisZ = () => {
   const { snapCamera } = useCamera();
   
   return (
      <div className={style.changeView}
         title='Snap view to Z'
         onClick={() => snapCamera('z')}
      >
         <div className={style.flexText}>
            <span>View</span><span>Z</span>
         </div>
      </div>
   );
}

const ViewController = () => (
   <div>
      <ViewAxisX/>
      <ViewAxisY/>
      <ViewAxisZ/>
   </div>
);

export default ViewController;