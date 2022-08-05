import { useRenderables, useModal } from 'contexts';
import { useTriggerOnce } from 'hooks';
import { Button, DropDown } from 'components/elements';

// modal will only pop up on first click
const ModalContent = () => (
   <div>
      <h1>Experimental</h1>
      <p>Please note the <b>marching cubes</b> isosurface method is still experimental. Currently, both the value-change and variable-change methods are disabled, and this is available as a proof-of-concept.</p>
   </div>
);

const MCButton = () => {
   const { createRenderable } = useRenderables();
   const { setModalContent } = useModal();
   const { triggerOnce } = useTriggerOnce();

   const handleClick = () => {
      createRenderable('mcube');
      triggerOnce(() => setModalContent(<ModalContent/>));
   }

   return (
      <Button 
         onClick={handleClick} 
         enabled 
         active 
         title='Isosurface' 
         text={<span style={{fontSize: '10px'}}>Tri</span>} 
         image={require('assets/img/surface_icon.png')}
      />
   );
}

const RayButton = () => {
   const { createRenderable } = useRenderables();

   return (
      <Button 
         onClick={() => createRenderable('surface')} 
         enabled 
         active 
         title='Isosurface' 
         text={<span style={{fontSize: '10px'}}>Ray</span>} 
         image={require('assets/img/surface_icon.png')}
      />
   );
}

const BaseIcon = () => (
   <Button 
      enabled 
      active 
      title='Isosurface' 
      image={require('assets/img/surface_icon.png')}
   />
);

const IsosurfaceButtons = () => (
   <DropDown baseItem={<BaseIcon/>} header='Isosurface'>
      <DropDown baseItem={<RayButton/>} header='Ray Marching'/>
      <DropDown baseItem={<MCButton/>} header='Marching Cubes'/>
   </DropDown>
);

export default IsosurfaceButtons;