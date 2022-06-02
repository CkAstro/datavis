import VisItem from './visitem';
import { useRenderables } from '../../contexts/renderables';
import './itemdisplay.css';

const ItemDisplay = () => {
   const { renderables } = useRenderables();

   const getItemList = () => renderables.map(item => {
      return <VisItem key={item.id} props={item}/>
   });
   
   return (
      <div className='displayContainer'>
         <div className='itemDisplay'>
            {getItemList()}
         </div>
      </div>
   );
}

export default ItemDisplay;