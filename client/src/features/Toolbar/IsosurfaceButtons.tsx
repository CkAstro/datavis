import { surfaceIcon } from '@/assets/img';
import { Button, DropDown } from '@/components/elements';
import { useRenderables, useModal } from '@/contexts';
import { useTriggerOnce } from '@/hooks';

// modal will only pop up on first click
const ModalContent = (): JSX.Element => (
   <div>
      <h1>Experimental</h1>
      <p>
         Please note the <b>marching cubes</b> isosurface method is still experimental. Currently,
         both the value-change and variable-change methods are disabled, and this is available as a
         proof-of-concept.
      </p>
   </div>
);

const MCButton = (): JSX.Element => {
   const { createRenderable } = useRenderables();
   const { setModalContent } = useModal();
   const { triggerOnce } = useTriggerOnce();

   const handleClick = (): void => {
      createRenderable('mcube');
      triggerOnce(() => setModalContent(<ModalContent />));
   };

   return (
      <Button
         onClick={handleClick}
         enabled={true}
         active={true}
         text={<span style={{ fontSize: '10px' }}>Tri</span>}
         image={surfaceIcon}
      />
   );
};

const RayButton = (): JSX.Element => {
   const { createRenderable } = useRenderables();

   return (
      <Button
         onClick={(): void => createRenderable('surface')}
         enabled={true}
         active={true}
         text={<span style={{ fontSize: '10px' }}>Ray</span>}
         image={surfaceIcon}
      />
   );
};

const BaseIcon = (): JSX.Element => <Button enabled={true} active={true} image={surfaceIcon} />;

const IsosurfaceButtons = (): JSX.Element => (
   <DropDown baseItem={<BaseIcon />} header="Isosurface">
      <DropDown baseItem={<RayButton />} header="Ray Marching" />
      <DropDown baseItem={<MCButton />} header="Marching Cubes" />
   </DropDown>
);

export default IsosurfaceButtons;
