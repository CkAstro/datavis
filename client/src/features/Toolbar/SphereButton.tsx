import { sphereIcon } from '@/assets/img';
import { Button, DropDown } from '@/components/elements';
import { useRenderables } from '@/contexts';

const SphereButton = (): JSX.Element => {
   const { createRenderable } = useRenderables();

   return (
      <DropDown
         header="Sphere"
         baseItem={
            <Button
               onClick={(): void => createRenderable('sphere')}
               enabled={true}
               active={true}
               image={sphereIcon}
            />
         }
      />
   );
};

export default SphereButton;
