import { useRenderables } from 'contexts';
import { Button, DropDown } from 'components/elements';

const YPlaneButton = () => {
   const { createRenderable } = useRenderables();

   return (
      <DropDown header='Y-Slice' baseItem={
         <Button 
            onClick={() => createRenderable('yslice')} 
            enabled 
            active 
            title='Y-Planar Slice' 
            image={require('assets/img/zyx_y_icon.png')}
         />
      }/>
   );
}

export default YPlaneButton;