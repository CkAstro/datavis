import { useCamera } from 'contexts';
import { Button, DropDown } from 'components/elements';

// clicking buttons will snap to appropriate axis

const ViewAxisX = () => {
   const { snapCamera } = useCamera();

   return (
      <Button 
         text={<><span>View</span><span>X</span></>}
         enabled
         active
         onClick={() => snapCamera('x')}
      />
   );
}

const ViewAxisY = () => {
   const { snapCamera } = useCamera();

   return (
      <Button 
         text={<><span>View</span><span>Y</span></>}
         enabled
         active
         onClick={() => snapCamera('y')}
      />
   );
}

const ViewAxisZ = () => {
   const { snapCamera } = useCamera();

   return (
      <Button 
         text={<><span>View</span><span>Z</span></>}
         enabled
         active
         onClick={() => snapCamera('z')}
      />
   );
}

const ViewController = () => (
   <div>
      <DropDown baseItem={<ViewAxisX/>} header='Snap to X-Axis'/>
      <DropDown baseItem={<ViewAxisY/>} header='Snap to Y-Axis'/>
      <DropDown baseItem={<ViewAxisZ/>} header='Snap to Z-Axis'/>
   </div>
);

export default ViewController;