import { useCamera } from '@/contexts';
import { Button } from '@/components/elements';

const ViewAxisX = () => {
   const { snapCamera } = useCamera();

   return (
      <Button
         text={
            <>
               <span>View</span>
               <span>X</span>
            </>
         }
         enabled
         active
         onClick={() => snapCamera('x')}
      />
   );
};

export default ViewAxisX;
