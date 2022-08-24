import { useState, useEffect } from 'react';
import { useRenderables } from '@/contexts';
import type { SliderProps } from '@/types';
import css from './Content.module.scss';

type Props = {
   props: SliderProps;
};

const Slider = ({ props }: Props): JSX.Element => {
   const [input, setInput] = useState<string>('');
   const [editMode, setEditMode] = useState<boolean>(false);

   const { changeSlideValue } = useRenderables();
   const { isActive } = props;

   useEffect(() => {
      if (isActive === false) setEditMode(false);
   }, [isActive]);

   const enableEdit = (): void => {
      setInput(props.trueValue.toString());
      setEditMode(true);
   };

   const disableEdit = (): void => {
      setEditMode(false);
      setInput('');
   };

   const handleKeyPress = (event: React.KeyboardEvent): void => {
      if (event.keyCode === 27) disableEdit();
   };

   const requestValChange = (event: React.FormEvent): void => {
      event.preventDefault();
      // eslint-disable-next-line no-implicit-coercion
      if (Number.isNaN(+input)) return; // must be number..
      const numberValue = parseFloat(input) * 100;
      if (numberValue > props.max || numberValue < props.min) return;
      if (numberValue < 0 && (props.variable === 'value' || props.variable === 'radius')) return;
      changeSlideValue(numberValue, props.ind, props.id);
      setEditMode(false);
   };

   const handleInput = (event: React.FormEvent<HTMLInputElement>): void =>
      setInput(event.currentTarget.value);
   const handleFocus = (event: React.FocusEvent<HTMLInputElement>): void => event.target.select();

   const valChangeArea = (
      <form onSubmit={requestValChange}>
         <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={true}
            className={css.valChangeArea}
            onChange={handleInput}
            value={input}
            onKeyDown={handleKeyPress}
            onBlur={(): void => disableEdit()}
            onFocus={handleFocus}
         />
      </form>
   );

   const valDisplayArea = (
      <span className={`noselect ${css.varSliderValue}`} onDoubleClick={(): void => enableEdit()}>
         {props.trueValue}
      </span>
   );
   const valDisplay = editMode ? valChangeArea : valDisplayArea;

   return (
      <div className={css.varSlider}>
         <span className={`noselect ${css.varSliderText}`}>{props.text}</span>
         <input
            type="range"
            onChange={(e): void => changeSlideValue(e.target.value, props.ind, props.id)}
            min={props.min}
            max={props.max}
            value={props.value}
         />
         {valDisplay}
      </div>
   );
};

export default Slider;
