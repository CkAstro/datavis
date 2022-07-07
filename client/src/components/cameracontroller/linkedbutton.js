import { useCamera } from '../../contexts/camera';
import style from './cameracontroller.module.css';

const LinkedButton = () => {
   const { options, handleLinked } = useCamera();

   const linkedClass = options.compare
      ? (options.linked ? style.active : style.inactive) 
      : style.disabled
   ;

   return <div>
      <img className={linkedClass} 
         title='Link Cameras'
         src={require('./img/linked.png')} 
         onClick={handleLinked}
      />
   </div>;
}

export default LinkedButton;