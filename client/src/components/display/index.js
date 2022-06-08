import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import GL2Canvas from '../gl2canvas';
import drawScene from '../../utils/glhelper/drawscene';
import { CompareButton, LinkedButton, ViewAxisX, ViewAxisY, ViewAxisZ } from './cameracontroller';
import './display.css';
import { BinaryUploadButton, ImgUploadButton, LoadButton, SaveButton, UploadButton } from './fileoptions';
import SceneOptions from './sceneoptions';

const Display = () => {
   const { options, handleCamera } = useCamera();
   const { renderables } = useRenderables();

   return (
      <div className='displayArea'>
         <p><b>Display</b></p>
         <div className='actionBar'>
            <SaveButton/>
            <LoadButton/>
            <div className='separator'/>
            <UploadButton/>
            <ImgUploadButton/>
            <BinaryUploadButton/>
            <div className='separator'/>
            <CompareButton/>
            <LinkedButton/>
            <div className='separator'/>
            <ViewAxisX/>
            <ViewAxisY/>
            <ViewAxisZ/>
         </div>
         <GL2Canvas 
            draw={drawScene} 
            scene={options} 
            objects={renderables} 
            moveCamera={handleCamera}
         />
         <SceneOptions/>
      </div>
   );
}

export default Display;