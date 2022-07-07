import { useRenderables } from "../../../contexts/renderables"
import './index.css';

const VariableSelector = ({ controllerId }) => {
   const { changeActiveVar } = useRenderables();

   const handleSelection = event => {
      event.preventDefault();
      changeActiveVar(controllerId, event.target.value);
   }

   return (
      <div className='varSelectContainer'>
         <span>Variable:</span>
         <select onChange={e => handleSelection(e)}>
            <option value='density'>Density</option>
            <option value='pressure'>Pressure</option>
            <option value='color'>Color</option>
         </select>
      </div>
   );
}

export default VariableSelector;