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

export {
   CompareButton,
   LinkedButton,
   ViewAxisX,
   ViewAxisY,
   ViewAxisZ,
}