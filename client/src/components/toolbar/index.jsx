import ItemCreator from './itemcreator';
import ItemDisplay from '../itemdisplay';
import style from './toolbar.module.css';

const Toolbar = () => {
   return (
      <div className={style.toolbarArea}>
         <p>Toolbar</p>
         <ItemCreator/>
         <ItemDisplay/>
      </div>
   );
}

export default Toolbar;