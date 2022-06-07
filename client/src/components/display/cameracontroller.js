import { useCamera } from '../../contexts/camera';
import './display.css'; 

const CompareButton = () => {
   const { options, handleCompare } = useCamera();

   const compareClass = options.compare ? 'active' : '';

   return <img className={compareClass}
      title='Compare Mode'
      src={require('./compare.png')} 
      onClick={handleCompare}
   />
}

const LinkedButton = () => {
   const { options, handleLinked } = useCamera();

   const linkedClass = options.compare ? 
      (options.linked ? 'active' : '') : 
      'disabled';

   return <img className={linkedClass} 
      title='Link Cameras'
      src={require('./linked.png')} 
      onClick={handleLinked}
   />
}

export {
   CompareButton,
   LinkedButton,
}