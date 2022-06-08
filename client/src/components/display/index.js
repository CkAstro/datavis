import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import GL2Canvas from '../gl2canvas';
import drawScene from '../../utils/glhelper/drawscene';
import './display.css';
import SceneOptions from './sceneoptions';
import Modal from '../modal';
import { useState, useEffect } from 'react';
import { useModal } from '../../contexts/modal';
import SessionController from './sessioncontroller';
import UploadController from './uploadcontroller';
import CameraController from './cameracontroller';
import ViewController from './viewcontroller';

const Display = () => {
   const [ modalActive, setModalActive ] = useState(false);

   const { modalContent } = useModal();

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
            <SessionController/>
            <div className='separator'/>
            <UploadController/>
            <div className='separator'/>
            <CameraController/>
            <div className='separator'/>
            <ViewController/>
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