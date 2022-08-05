import { useRenderables } from 'contexts';
import { Button, DropDown } from 'components/elements';

const XPlaneButton = () => {
   const { createRenderable } = useRenderables();

   return (
      <DropDown header='X-Slice' baseItem={
         <Button 
            onClick={() => createRenderable('xslice')} 
            enabled 
            active 
            title='X-Planar Slice' 
            image={require('assets/img/zyx_x_icon.png')}
         /> 
      }/>
   );
}

export default XPlaneButton;