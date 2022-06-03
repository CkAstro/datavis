import { useRenderables } from '../../../contexts/renderables';
import VariableSelector from './variableselector';
import './itemcontroller.css';

const ControllerContent = ({ controllerId }) => {
   const { renderables, handleSliderChange } = useRenderables();

   const activeItem = renderables.find(item => item.id === controllerId);
   const isActive = activeItem.isActive;

   const sliderList = () => {
      return activeItem.sliderList.map((slider, ind) => {
         return (
            <div key={ind} className='varSlider'>
               <span className='varSliderText'>{slider.text}</span>
               <input 
                  type='range' 
                  onChange={e => handleSliderChange(e.target.value, ind, activeItem.id)}
                  min={slider.min} 
                  max={slider.max} 
                  value={slider.value}
               />
               <span className='varSliderValue'>{slider.trueValue}</span>
            </div>
         );
      });
   }

   return (
      <div className={`controllerContent ${isActive ? 'active' : ''}`}>
         <div className='sliderContainer'>
            {sliderList()}
         </div>
         <VariableSelector controllerId={controllerId}/>
      </div>
   );

}

export default ControllerContent;