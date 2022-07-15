import { useCamera } from 'contexts';
import style from './cameracontroller.module.css';

// this button toggles compare mode
// initial state: inactive (red coloring)
// toggles to active (green coloring)
const CompareButton = () => {
   const { options, toggleCompare } = useCamera();

   const compareClass = options.compare ? style.active : style.inactive;

   return (
      <div>
         <img className={compareClass}
            title='Compare Mode'
            src={require('assets/img/compare_icon.png')} 
            onClick={toggleCompare}
         />
      </div>
   );
}

export default CompareButton;