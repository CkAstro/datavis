import { Modal } from '@/components/elements';
import ActionBar from './ActionBar';
import SceneOptions from './SceneOptions';
import Viewport from './Viewport';
import css from './Display.module.scss';

export const Display = (): JSX.Element => (
   <div className={css.display}>
      <Modal />
      <ActionBar />
      <Viewport />
      <SceneOptions />
   </div>
);
