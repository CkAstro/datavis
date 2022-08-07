import { ObjectManager } from 'components/objectmanager';
import ItemCreator from './itemcreator';
import style from './toolbar.module.css';

function Toolbar() {
   return (
      <div className={style.toolbar}>
         <ItemCreator />
         <p>Object Controllers</p>
         <ObjectManager />
      </div>
   );
}

export default Toolbar;
