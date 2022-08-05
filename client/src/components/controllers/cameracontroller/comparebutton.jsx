import { useCamera } from 'contexts';
import { Button } from 'components/elements';

// this button toggles compare mode
// initial state: inactive (red coloring)
// toggles to active (green coloring)
const CompareButton = () => {
   const { options, toggleCompare } = useCamera();

   return (
      <Button 
         image={require('assets/img/compare_icon.png')} 
         enabled
         active={options.compare}
         onClick={toggleCompare}
      />
   );
}

export default CompareButton;