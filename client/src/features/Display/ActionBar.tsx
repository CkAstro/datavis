import {
   SessionController,
   UploadController,
   CameraController,
   ViewController,
   AboutController,
} from '@/components/controllers';
import css from './Display.module.scss';

const ActionBar = (): JSX.Element => (
   <div className={css.display__actionbar}>
      <AboutController />
      <SessionController />
      <UploadController />
      <CameraController />
      <ViewController />
   </div>
);

export default ActionBar;
