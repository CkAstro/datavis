import { useRenderables } from 'contexts';
import VariableSelector from './variableselector';
import Slider from './slider';
import style from './content.module.css';

function ControllerContent({ controllerId }) {
   const { renderables } = useRenderables();

   const activeItem = renderables.find((item) => item.id === controllerId);
   const { isActive } = activeItem;

   const sliderList = activeItem.sliderList.map((slider, ind) => {
      const key = activeItem.id + ind;
      const props = {
         isActive,
         id: activeItem.id,
         variable: slider.variable,
         ind,
         text: slider.text,
         min: slider.min,
         max: slider.max,
         value: slider.value,
         trueValue: slider.trueValue,
      };
      return <Slider key={key} props={props} />;
   });

   return (
      <div
         className={`${style.controllerContent} ${
            isActive ? style.active : null
         }`}
      >
         <div className={style.sliderContainer}>{sliderList}</div>
         <VariableSelector controllerId={controllerId} />
      </div>
   );
}

export default ControllerContent;
