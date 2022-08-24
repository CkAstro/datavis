import { useCamera } from '@/contexts';
import { Button } from '@/components/elements';

const ViewAxisZ = () => {
   const { snapCamera } = useCamera();

   return (
      <Button
         text={
            <>
               <span>View</span>
               <span>Z</span>
            </>
         }
         enabled
         active
         onClick={() => snapCamera('z')}
      />
   );
};

export default ViewAxisZ;
