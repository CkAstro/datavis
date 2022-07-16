import { useCamera } from 'contexts';
import { Button } from 'components/elements';

// this button toggles camera link mode
// initial state: disabled (gray coloring)
// toggles from active (green coloring) to inactive (red coloring)
const LinkedButton = () => {
   const { options, toggleLinked } = useCamera();

   return (
      <Button 
         image={require('assets/img/linked_icon.png')} 
         hoverText='Link Cameras' 
         enabled={options.compare}
         active={options.linked}
         onClick={toggleLinked}
      />
   );
}

export default LinkedButton;