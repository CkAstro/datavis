import { useCamera } from '../../../contexts/camera';
import '../display.css'; 

const CompareButton = () => {
   const { options, handleCompare } = useCamera();

   const compareClass = options.compare ? 'active' : '';

   return <img className={compareClass}
      title='Compare Mode'
      src={require('./img/compare.png')} 
      onClick={handleCompare}
   />
}

export default CompareButton;