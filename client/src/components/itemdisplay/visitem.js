import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import './itemdisplay.css';

const VisItem = ({ props }) => {
   const { renderables, handleDelete, handleVisible } = useRenderables();
   const { options } = useCamera();

   const visButton1 = () => {
      const item = renderables.find(item => item.id === props.id);
      const isActive = item.isVisible[0];
      return (
         <div 
            onClick={() => handleVisible(props.id, 0)}
            className={`toggleVis ${isActive ? 'active' : ''}`}
         >1</div>
      );
   }

   const visButton2 = () => {
      const item = renderables.find(item => item.id === props.id);
      const isActive = item.isVisible[1];
      const isClickable = options.compare;
      
      return (
         <div
            onClick={isClickable ? () => handleVisible(props.id, 1) : null}
            className={`toggleVis ${isClickable ? (isActive ? 'active' : '') : 'disabled'}`}
         >2</div>
      );
   }

   return (
      <div className='visItem'>
         <div className='visHeader'>
            <div className='itemName'>{props.id} - {props.type}</div>
            <div className='toggleArea'>
               {visButton1()}
               {visButton2()}
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