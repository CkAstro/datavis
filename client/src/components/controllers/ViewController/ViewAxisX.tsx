import { Button } from '@/components/elements';
import { useCamera } from '@/contexts';

const ViewAxisX = (): JSX.Element => {
   const { snapCamera } = useCamera();

   return (
      <Button
         text={
            <>
               <span>View</span>
               <span>X</span>
            </>
         }
         enabled={true}
         active={true}
         onClick={(): void => snapCamera('z')}
      />
   );
};

export default ViewAxisX;
