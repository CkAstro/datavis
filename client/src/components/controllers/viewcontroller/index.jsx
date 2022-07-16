import { useCamera } from 'contexts';
import { Button } from 'components/elements';

// clicking buttons will snap to appropriate axis

const ViewAxisX = () => {
   const { snapCamera } = useCamera();

   return (
      <Button 
         text={<><span>View</span><span>X</span></>}
         hoverText='Snap view to X' 
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
         hoverText='Snap view to Y' 
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
         hoverText='Snap view to Z' 
         enabled
         active
         onClick={() => snapCamera('z')}
      />
   );
}

const ViewController = () => (
   <div>
      <ViewAxisX/>
      <ViewAxisY/>
      <ViewAxisZ/>
   </div>
);

export default ViewController;