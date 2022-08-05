import { useRenderables } from 'contexts';
import { Button, DropDown } from 'components/elements';

const SphereButton = () => {
   const { createRenderable } = useRenderables();

   return (
      <DropDown header='Sphere' baseItem={
         <Button 
            onClick={() => createRenderable('sphere')} 
            enabled 
            active 
            title='Spherical Slice' 
            image={require('assets/img/sphere_icon.png')}
         />
      }/>
   );
}

export default SphereButton;