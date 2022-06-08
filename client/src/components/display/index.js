import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import GL2Canvas from '../gl2canvas';
import drawScene from '../../utils/glhelper/drawscene';
import { CompareButton, LinkedButton, ViewAxisX, ViewAxisY, ViewAxisZ } from './cameracontroller';
import './display.css';
import { BinaryUploadButton, ImgUploadButton, LoadButton, SaveButton, UploadButton } from './fileoptions';
import SceneOptions from './sceneoptions';
import Modal from '../modal';
import { useState, useEffect } from 'react';

const Display = () => {
   const [ modalContent, setModalContent ] = useState(null);
   const [ modalActive, setModalActive ] = useState(false);

   const { options, handleCamera } = useCamera();
   const { renderables } = useRenderables();

   const closeModal = () => setModalActive(false);
   useEffect(() => {
      if (modalContent) setModalActive(true);
   }, [modalContent]);

   return (
      <div className='displayArea'>
         <p><b>Display</b></p>
         <Modal closeModal={closeModal} isActive={modalActive}>{modalContent}</Modal>
         <div className='actionBar'>
            <SaveButton setModalContent={setModalContent}/>
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