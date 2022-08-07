import { useRenderables } from 'contexts';
import ItemController from '../controller';
import style from './manager.module.css';

function ObjectManager() {
   const { renderables } = useRenderables();

   const getItemList = renderables.map((item) => (
      <ItemController key={item.id} props={item} />
   ));

   return (
      <div className={style.displayContainer}>
         <div className={`${style.itemDisplay} noscrollbar`}>{getItemList}</div>
      </div>
   );
}

export default ObjectManager;
