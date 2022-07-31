import { useModal } from 'contexts';
import { Button, Icons } from "components/elements";

const ModalContent = () => (
   <div>
      <h1>Help</h1>
      <p>Coming soon!</p>
   </div>
);

const HelpButton = () => {
   const { setModalContent } = useModal();

   return (
      <Button
         text={<Icons.QMark size='60' fill='black'/>}
         hoverText='Help'
         enabled
         active
         onClick={() => setModalContent(<ModalContent/>)}
      />
   );
}

export default HelpButton;