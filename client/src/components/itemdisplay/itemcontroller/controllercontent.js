import { useRenderables } from '../../../contexts/renderables';
import VariableSelector from './variableselector';
import Slider from './slider';
import './itemcontroller.css';

const ControllerContent = ({ controllerId }) => {
   const { renderables } = useRenderables();

   const activeItem = renderables.find(item => item.id === controllerId);
   const isActive = activeItem.isActive;

   const sliderList = () => {
      return activeItem.sliderList.map((slider, ind) => {
         const props = {
            isActive: isActive,
            id: activeItem.id,
            variable: slider.variable,
            ind: ind,
            text: slider.text,
            min: slider.min,
            max: slider.max,
            value: slider.value,
            trueValue: slider.trueValue,
         }
         return (
            <Slider key={ind} props={props}/>
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