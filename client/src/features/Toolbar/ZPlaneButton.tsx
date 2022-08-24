import { zyxZIcon } from '@/assets/img';
import { Button, DropDown } from '@/components/elements';
import { useRenderables } from '@/contexts';

const ZPlaneButton = (): JSX.Element => {
   const { createRenderable } = useRenderables();

   return (
      <DropDown
         header="Z-Slice"
         baseItem={
            <Button
               onClick={(): void => createRenderable('zslice')}
               enabled={true}
               active={true}
               image={zyxZIcon}
            />
         }
      />
   );
};

export default ZPlaneButton;
