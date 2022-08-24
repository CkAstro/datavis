import { Button } from '@/components/elements';
import { useCamera } from '@/contexts';

const ViewAxisZ = (): JSX.Element => {
   const { snapCamera } = useCamera();

   return (
      <Button
         text={
            <>
               <span>View</span>
               <span>Z</span>
            </>
         }
         enabled={true}
         active={true}
         onClick={(): void => snapCamera('z')}
      />
   );
};

export default ViewAxisZ;
