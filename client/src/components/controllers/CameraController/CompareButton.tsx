import { compareIcon } from '@/assets/img';
import { Button } from '@/components/elements';
import { useCamera } from '@/contexts';

// this button toggles compare mode
// initial state: inactive (red coloring)
// toggles to active (green coloring)
const CompareButton = (): JSX.Element => {
   const { options, toggleCompare } = useCamera();

   return (
      <Button image={compareIcon} enabled={true} active={options.compare} onClick={toggleCompare} />
   );
};

export default CompareButton;
