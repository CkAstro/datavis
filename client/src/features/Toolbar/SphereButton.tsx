import { useRenderables } from 'contexts';
import { Button, DropDown } from 'components/elements';
import { sphereIcon } from 'assets/img';

function SphereButton() {
   const { createRenderable } = useRenderables();

   return (
      <DropDown
         header="Sphere"
         baseItem={
            <Button
               onClick={() => createRenderable('sphere')}
               enabled
               active
               title="Spherical Slice"
               image={sphereIcon}
            />
         }
      />
   );
}

export default SphereButton;
