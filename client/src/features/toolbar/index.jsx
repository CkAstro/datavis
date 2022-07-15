import { ObjectManager } from 'components/objectmanager';
import ItemCreator from './itemcreator';
import style from './toolbar.module.css';

const Toolbar = () => (
   <div className={style.toolbarArea}>
      <p>Toolbar</p>
      <ItemCreator/>
      <ObjectManager/>
   </div>
);

export default Toolbar;