import { useRenderables } from 'contexts';
import { Button, DropDown } from 'components/elements';

const ZPlaneButton = () => {
   const { createRenderable } = useRenderables();

   return (
      <DropDown header='Z-Slice' baseItem={
         <Button 
            onClick={() => createRenderable('zslice')} 
            enabled 
            active 
            title='Z-Planar Slice' 
            image={require('assets/img/zyx_z_icon.png')}
         />
      }/>
   );
}

export default ZPlaneButton;