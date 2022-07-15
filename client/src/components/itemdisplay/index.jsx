import ItemController from './itemcontroller';
import { useRenderables } from '../../contexts/renderables';
import style from './itemdisplay.module.css';

const ItemDisplay = () => {
   const { renderables } = useRenderables();

   const getItemList = renderables.map(item => {
      return <ItemController key={item.id} props={item}/>
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

export default ItemDisplay;