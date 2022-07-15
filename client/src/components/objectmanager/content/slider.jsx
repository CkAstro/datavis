import { useState, useEffect } from 'react';
import { useRenderables } from 'contexts';
import style from './content.module.css';

const Slider = ({ props }) => {
   const [ input, setInput ] = useState('');
   const [ editMode, setEditMode ] = useState(false);

   const { changeSlideValue } = useRenderables();
   const isActive = props.isActive;

   useEffect(() => {
      if (!isActive) setEditMode(false);
   });

   const enableEdit = () => {
      setInput(props.trueValue);
      setEditMode(true);
   }

   const disableEdit = () => {
      setEditMode(false);
      setInput('');
   }

   const handleKeyPress = event => {
      if (event.keyCode === 27) disableEdit();
   }

   const requestValChange = event => {
      event.preventDefault();
      if (input != Number(input)) return;    // must be number..
      const numberValue = Number(input) * 100;
      if (numberValue > 100 || numberValue < -100) return;
      if (numberValue < 0 && (props.variable === 'value' || props.variable === 'radius')) return;
      changeSlideValue(numberValue, props.ind, props.id);
      setEditMode(false);
   }

   const handleInput = event => setInput(event.target.value);
   const handleFocus = event => event.target.select();

   const valChangeArea = (
      <form onSubmit={requestValChange}>
         <input autoFocus className={style.valChangeArea}
            onChange={handleInput}
            value={input}
            onKeyDown={handleKeyPress}
            onBlur={() => disableEdit()}
            onFocus={handleFocus}
         />
      </form>
   );

   const valDisplayArea = (
      <span className={`noselect ${style.varSliderValue}`}
         onDoubleClick={() => enableEdit()}
      >{props.trueValue}</span>
   );
   const valDisplay = editMode ? valChangeArea : valDisplayArea;

   return (
      <div className={style.varSlider}>
         <span className={`noselect ${style.varSliderText}`}>{props.text}</span>
         <input type='range'
            onChange={e => changeSlideValue(e.target.value, props.ind, props.id)}
            min={props.min}
            max={props.max}
            value={props.value}
         />
         {valDisplay}
      </div>
   );
}

export default Slider;