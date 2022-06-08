import ItemController from './itemcontroller';
import { useRenderables } from '../../contexts/renderables';
import './itemdisplay.css';

const ItemDisplay = () => {
   const { renderables } = useRenderables();

   const getItemList = () => renderables.map(item => {
      return <ItemController key={item.id} props={item}/>
   });
   
   return (
      <>
         <p>Item Controller</p>
         <div className='displayContainer'>
            <div className='itemDisplay noscrollbar'>
               {getItemList()}
            </div>
         </div>
      </>
   );
}

export default ItemDisplay;