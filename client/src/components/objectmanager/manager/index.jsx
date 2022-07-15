import { useRenderables } from 'contexts';
import ItemController from '../controller';
import style from './manager.module.css';

const ObjectManager = () => {
   const { renderables } = useRenderables();

   const getItemList = renderables.map(item => {
      return <ItemController key={item.id} props={item}/>;
   });
   
   return (
      <>
         <p>Item Controller</p>
         <div className={style.displayContainer}>
            <div className={`${style.itemDisplay} noscrollbar`}>
               {getItemList}
            </div>
         </div>
      </>
   );
}

export default ObjectManager;