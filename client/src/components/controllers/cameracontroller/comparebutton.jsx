import { useCamera } from 'contexts';
import { Button } from 'components/elements';
import { compareIcon } from 'assets/img';

// this button toggles compare mode
// initial state: inactive (red coloring)
// toggles to active (green coloring)
function CompareButton() {
   const { options, toggleCompare } = useCamera();

   return (
      <Button
         image={compareIcon}
         enabled
         active={options.compare}
         onClick={toggleCompare}
      />
   );
}

export default CompareButton;
