import { useCamera } from '../../contexts/camera';
import style from './cameracontroller.module.css';

const CompareButton = () => {
   const { options, handleCompare } = useCamera();

   const compareClass = options.compare ? style.active : style.inactive;

   return <div>
      <img className={compareClass}
         title='Compare Mode'
         src={require('./img/compare.png')} 
         onClick={handleCompare}
      />
   </div>;
}

export default CompareButton;