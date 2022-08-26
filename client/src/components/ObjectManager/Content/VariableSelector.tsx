import { useRenderables } from '@/contexts';
import css from './Content.module.scss';

type Props = {
   controllerId: number;
};

const VariableSelector = ({ controllerId }: Props): JSX.Element => {
   const { changeActiveVar } = useRenderables();

   const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>): void => {
      event.preventDefault();
      changeActiveVar(controllerId, event.target.value);
   };

   return (
      <div className={css.varSelectContainer}>
         <span>Variable:</span>
         <select onChange={handleSelection}>
            <option value="density">Density</option>
            <option value="pressure">Pressure</option>
            <option value="color">Color</option>
         </select>
      </div>
   );
};

export default VariableSelector;
