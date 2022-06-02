import { useRenderables } from '../../contexts/renderables';
import './itemdisplay.css';

const VisItem = ({ props }) => {
   const { handleDelete } = useRenderables();

   return (
      <div className='visItem'>
         <div className='visHeader'>
            <div className='itemName'>{props.id} - {props.type}</div>
            <div className='toggleArea'>
               <div className='toggleVis active'>1</div>
               <div className='toggleVis disabled'>2</div>
            </div>
            <img 
               className='closeButton' 
               onClick={() => handleDelete(props.id)}
               src={require('./trashcan_small.png')}
            />
         </div>
      </div>
   );
}

export default VisItem;