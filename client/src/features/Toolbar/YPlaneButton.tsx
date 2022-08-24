import { zyxYIcon } from '@/assets/img';
import { Button, DropDown } from '@/components/elements';
import { useRenderables } from '@/contexts';

const YPlaneButton = (): JSX.Element => {
   const { createRenderable } = useRenderables();

   return (
      <DropDown
         header="Y-Slice"
         baseItem={
            <Button
               onClick={(): void => createRenderable('yslice')}
               enabled={true}
               active={true}
               image={zyxYIcon}
            />
         }
      />
   );
};

export default YPlaneButton;
