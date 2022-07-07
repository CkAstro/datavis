import { useModal } from '../../contexts/modal';
import style from './uploadcontroller.module.css';

const ImgUploadButton = () => {
   const { updateModal } = useModal();
   const displayModal = () => {
      updateModal(
         <div className={style.modalContent}>
            <h1>Upload from Image</h1>
            <p>You are attempting to upload data from an image.</p>
            <p><b>Unfortunately, this feature is not yet enabled.</b></p>
         </div>
      );
   }

   return <div>
      <img className='disabled'
         title='Upload Data from Image'
         src={require('./img/imgupload.png')}
         onClick={displayModal}
      />
   </div>;
}

export default ImgUploadButton;