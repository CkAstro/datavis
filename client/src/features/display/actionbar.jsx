import {
   SessionController,
   UploadController,
   CameraController,
   ViewController,
   HelpController
} from 'components/controllers';
import style from './display.module.css';

const ActionBar = () => (
   <div className={style.display__actionbar}>
      <HelpController/>
      <SessionController/>
      <UploadController/>
      <CameraController/>
      <ViewController/>
   </div>
);

export default ActionBar;