import { zyxXIcon } from '@/assets/img';
import { Button, DropDown } from '@/components/elements';
import { useRenderables } from '@/contexts';

const XPlaneButton = (): JSX.Element => {
   const { createRenderable } = useRenderables();

   return (
      <DropDown
         header="X-Slice"
         baseItem={
            <Button
               onClick={(): void => createRenderable('xslice')}
               enabled={true}
               active={true}
               image={zyxXIcon}
            />
         }
      />
   );
};

export default XPlaneButton;
