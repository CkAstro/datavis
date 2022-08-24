import { ObjectManager } from '@/components/ObjectManager';
import ItemCreator from './ItemCreator';
import css from './Toolbar.module.scss';

export const Toolbar = (): JSX.Element => (
   <div className={css.toolbar}>
      <ItemCreator />
      <p>Object Controllers</p>
      <ObjectManager />
   </div>
);
