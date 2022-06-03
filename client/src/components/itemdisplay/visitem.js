import { useCamera } from '../../contexts/camera';
import { useRenderables } from '../../contexts/renderables';
import './itemdisplay.css';

const VisItem = ({ props }) => {
   const { renderables, handleDelete, handleVisible, handleActivate } = useRenderables();
   const { options } = useCamera();

   const activeItem = renderables.find(item => item.id === props.id);
   const isActive = activeItem.isActive;

   const visButton1 = () => {
      const isVisible = activeItem.isVisible[0];
      return (
         <div 
            onClick={() => handleVisible(props.id, 0)}
            className={`toggleVis ${isVisible ? 'active' : ''}`}
         >1</div>
      );
   }

   const visButton2 = () => {
      const isVisible = activeItem.isVisible[1];
      const isClickable = options.compare;
      
      return (
         <div
            onClick={isClickable ? () => handleVisible(props.id, 1) : null}
            className={`toggleVis ${isClickable ? (isVisible ? 'active' : '') : 'disabled'}`}
         >2</div>
      );
   }

   return (
      <div className='visItem'>
         <div className='visHeader' onClick={() => handleActivate(props.id)}>
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
         <div className={`visContent ${isActive ? 'active' : ''}`}>
            <div className='visContentContainer'>
               <span>x offset</span>
               <input type='range'/>
               <span>value..</span>
               <div className='displaySelector'>
                  <span>variable:</span>
                  <select>
                     <option value='density'>Density</option>
                     <option value='pressure'>Pressure</option>
                     <option value='color'>Color</option>
                  </select>
               </div>
            </div>
         </div>
      </div>
   );
}

export default VisItem;