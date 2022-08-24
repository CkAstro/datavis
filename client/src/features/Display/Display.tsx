import { Modal } from 'components/elements';
import ActionBar from './actionbar';
import SceneOptions from './sceneoptions';
import Viewport from './viewport';
import style from './display.module.css';

function Display() {
   return (
      <div className={style.display}>
         <Modal />
         <ActionBar />
         <Viewport />
         <SceneOptions />
      </div>
   );
}

export default Display;
