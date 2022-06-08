import './display.css';

const LoadButton = () => {

   return <img className='disabled'
      title='Load Session'
      src={require('./load.png')}
      onClick={null}
   />
}

const SaveButton = ({ setModalContent }) => {
   const displaySaveModal = () => {
      setModalContent(
         <>
            <h1>Save Session</h1>
            <p>You are attempting to save your session.</p>
            <p><b>Unfortunately, this feature is not yet enabled.</b></p>
         </>
      );
   }

   return <img className='disabled'
      title='Save Session'
      src={require('./save.png')}
      onClick={() => displaySaveModal()}
   />
}

const UploadButton = () => {

   return <img className='disabled'
      title='Upload Data from Text'
      src={require('./upload.png')}
      onClick={null}
   />
}

const ImgUploadButton = () => {

   return <img className='disabled'
      title='Upload Data from Image'
      src={require('./imgupload.png')}
      onClick={null}
   />
}

const BinaryUploadButton = () => {

   return <img className='disabled'
      title='Upload Data from Binary'
      src={require('./binaryupload.png')}
      onClick={null}
   />
}

export {
   LoadButton,
   SaveButton,
   UploadButton,
   ImgUploadButton,
   BinaryUploadButton,
}