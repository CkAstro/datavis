import { useRenderables } from 'contexts';
import { Button, DropDown } from 'components/elements';
import { zyxXIcon } from 'assets/img';

function XPlaneButton() {
   const { createRenderable } = useRenderables();

   return (
      <DropDown
         header="X-Slice"
         baseItem={
            <Button
               onClick={() => createRenderable('xslice')}
               enabled
               active
               title="X-Planar Slice"
               image={zyxXIcon}
            />
         }
      />
   );
}

export default XPlaneButton;
