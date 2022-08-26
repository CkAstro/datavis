import { Button } from '@/components/elements';
import { useCamera } from '@/contexts';

const ViewAxisY = (): JSX.Element => {
   const { snapCamera } = useCamera();

   return (
      <Button
         text={
            <>
               <span>View</span>
               <span>Y</span>
            </>
         }
         enabled={true}
         active={true}
         onClick={(): void => snapCamera('z')}
      />
   );
};

export default ViewAxisY;
