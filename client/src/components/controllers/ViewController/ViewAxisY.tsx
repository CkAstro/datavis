import { useCamera } from '@/contexts';
import { Button } from '@/components/elements';

const ViewAxisY = () => {
   const { snapCamera } = useCamera();

   return (
      <Button
         text={
            <>
               <span>View</span>
               <span>Y</span>
            </>
         }
         enabled
         active
         onClick={() => snapCamera('y')}
      />
   );
};

export default ViewAxisY;
