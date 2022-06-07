import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import GL2Canvas from '../gl2canvas';
import drawScene from '../../utils/glhelper/drawscene';
import { CompareButton, LinkedButton } from './cameracontroller';
import './display.css';

const Display = () => {
   const { options, handleCamera } = useCamera();
   const { renderables } = useRenderables();

   return (
      <div className='displayArea'>
         <p><b>Display</b></p>
         <div className='actionBar'>
            <CompareButton/>
            <LinkedButton/>
         </div>
         <GL2Canvas 
            draw={drawScene} 
            scene={options} 
            objects={renderables} 
            moveCamera={handleCamera}
         />
      </div>
   );
}

export default Display;