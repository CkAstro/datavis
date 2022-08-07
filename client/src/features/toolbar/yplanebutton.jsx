import { useRenderables } from 'contexts';
import { Button, DropDown } from 'components/elements';
import { zyxYIcon } from 'assets/img';

function YPlaneButton() {
   const { createRenderable } = useRenderables();

   return (
      <DropDown
         header="Y-Slice"
         baseItem={
            <Button
               onClick={() => createRenderable('yslice')}
               enabled
               active
               title="Y-Planar Slice"
               image={zyxYIcon}
            />
         }
      />
   );
}

export default YPlaneButton;
