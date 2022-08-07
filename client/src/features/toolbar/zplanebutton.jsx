import { useRenderables } from 'contexts';
import { Button, DropDown } from 'components/elements';
import { zyxZIcon } from 'assets/img';

function ZPlaneButton() {
   const { createRenderable } = useRenderables();

   return (
      <DropDown
         header="Z-Slice"
         baseItem={
            <Button
               onClick={() => createRenderable('zslice')}
               enabled
               active
               title="Z-Planar Slice"
               image={zyxZIcon}
            />
         }
      />
   );
}

export default ZPlaneButton;
