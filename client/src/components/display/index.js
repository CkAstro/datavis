import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import GL2Canvas from '../gl2canvas';
import drawScene from '../../utils/glhelper/drawscene';
import './display.css';

const Display = () => {
   const { options, handleCamera } = useCamera();
   const { renderables } = useRenderables();

   return (
      <div className='displayArea'>
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