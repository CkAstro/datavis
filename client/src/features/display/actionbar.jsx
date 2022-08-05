import {
   SessionController,
   UploadController,
   CameraController,
   ViewController,
   AboutController
} from 'components/controllers';
import style from './display.module.css';

const ActionBar = () => (
   <div className={style.display__actionbar}>
      <AboutController/>
      <SessionController/>
      <UploadController/>
      <CameraController/>
      <ViewController/>
   </div>
);

export default ActionBar;