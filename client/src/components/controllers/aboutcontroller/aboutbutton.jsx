import { useModal } from 'contexts';
import { Button, Icons } from "components/elements";

const ModalContent = () => (
   <div>
      <h1>About</h1>
      
      <p>The <b>front end</b> is created using React and a custom WebGL/GLSL implementation to quickly render volumetric data. A serverless 'offline' version is in the works.</p>

      <p>The <b>back end</b> runs on node+Express and will eventually process,store (upon request), and re-serve user-submitted data in an easily-renderable data format. A user log-in is planned so both saved sessions and stored datasets are accessable from anywhere.</p>
   </div>
);

const AboutButton = () => {
   const { setModalContent } = useModal();

   return (
      <Button
         text={<Icons.QMark size='60' fill='black'/>}
         enabled
         active
         onClick={() => setModalContent(<ModalContent/>)}
      />
   );
}

export default AboutButton;