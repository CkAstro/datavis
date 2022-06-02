import { useCamera } from '../../contexts/camera';
import './toolbar.css'; 

const CameraController = () => {
   const { options, handleCompare, handleLinked } = useCamera();

   const compareClass = options.compare ? 'active' : '';
   const linkedClass = options.compare && options.linked ? 'active' : '';

   return (
      <div className='cameraController'>
         <button className={linkedClass} onClick={handleLinked}>Camera Link</button>
         <button className={compareClass} onClick={handleCompare}>Compare Mode</button>
         <p>Camera Options</p>
      </div>
   );
}

export default CameraController;