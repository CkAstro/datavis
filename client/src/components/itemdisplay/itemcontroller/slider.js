import { useState, useEffect } from 'react';
import { useRenderables } from '../../../contexts/renderables';

const Slider = ({ props }) => {
   const [ input, setInput ] = useState('');
   const [ editMode, setEditMode ] = useState(false);

   const { renderables, handleSliderChange } = useRenderables();
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
      const numberValue = Number(input) * 100;
      if (numberValue > 100 || numberValue < -100) return;
      if (numberValue < 0 && (props.variable === 'value' || props.variable === 'radius')) return;
      handleSliderChange(numberValue, props.ind, props.id);
      setEditMode(false);
   }

   const handleInput = event => setInput(event.target.value);
   const clearInput = event => {
      // NOTE: we don't want to use '===' here
      if (event.target.value == props.trueValue) { 
         setInput('');
      }
   }

   const valChangeArea = (
      <form onSubmit={requestValChange}>
         <input autoFocus className='valChangeArea'
            onChange={handleInput}
            value={input}
            onClick={clearInput}
            onKeyDown={handleKeyPress}
            onBlur={() => disableEdit()}
         />
      </form>
   );

   const valDisplayArea = (
      <span className='varSliderValue noselect'
         onDoubleClick={() => enableEdit()}
      >{props.trueValue}</span>
   );
   const valDisplay = editMode ? valChangeArea : valDisplayArea;

   return (
      <div className='varSlider'>
         <span className='varSliderText noselect'>{props.text}</span>
         <input type='range'
            onChange={e => handleSliderChange(e.target.value, props.ind, props.id)}
            min={props.min}
            max={props.max}
            value={props.value}
         />
         {valDisplay}
      </div>
   );
}

export default Slider;