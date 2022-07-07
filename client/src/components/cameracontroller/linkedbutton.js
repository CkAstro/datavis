import { useCamera } from '../../../contexts/camera';
import '../display.css';

const LinkedButton = () => {
   const { options, handleLinked } = useCamera();

   const linkedClass = options.compare ? 
      (options.linked ? 'active' : '') : 
      'disabled';

   return <img className={linkedClass} 
      title='Link Cameras'
      src={require('./img/linked.png')} 
      onClick={handleLinked}
   />
}

export default LinkedButton;