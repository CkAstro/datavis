import { useCamera } from '@/contexts';
import { Button } from '@/components/elements';
import { linkedIcon } from '@/assets/img';

// this button toggles camera link mode
// initial state: disabled (gray coloring)
// toggles from active (green coloring) to inactive (red coloring)
const LinkedButton = () => {
   const { options, toggleLinked } = useCamera();

   return (
      <Button
         image={linkedIcon}
         enabled={options.compare}
         active={options.linked}
         onClick={toggleLinked}
      />
   );
};

export default LinkedButton;
