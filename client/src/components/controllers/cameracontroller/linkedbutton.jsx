import { useCamera } from 'contexts';
import style from './cameracontroller.module.css';


// this button toggles camera link mode
// initial state: disabled (gray coloring)
// toggles from active (green coloring) to inactive (red coloring)
const LinkedButton = () => {
   const { options, toggleLinked } = useCamera();

   const linkedClass = options.compare
      ? (options.linked ? style.active : style.inactive) 
      : style.disabled
   ;

   return (
      <div>
         <img className={linkedClass} 
            title='Link Cameras'
            src={require('assets/img/linked_icon.png')} 
            onClick={toggleLinked}
         />
      </div>
   );
}

export default LinkedButton;