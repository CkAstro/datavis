import { useRenderables } from '@/contexts';
import type { Renderable, Slider } from '@/types';
import ValueSlider from './ValueSlider';
import VariableSelector from './VariableSelector';
import css from './Content.module.scss';

type Props = {
   controllerId: number;
};

export const Content = ({ controllerId }: Props): JSX.Element => {
   const { renderables } = useRenderables();

   const activeItem = renderables.find((item: Renderable) => item.id === controllerId)!;
   const { isActive } = activeItem;

   const sliderList = activeItem.sliderList.map((slider: Slider, ind: number) => {
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
      return <ValueSlider key={key} props={props} />;
   });

   return (
      <div className={`${css.controllerContent} ${isActive !== false ? css.active : ''}`}>
         <div className={css.sliderContainer}>{sliderList}</div>
         <VariableSelector controllerId={controllerId} />
      </div>
   );
};
