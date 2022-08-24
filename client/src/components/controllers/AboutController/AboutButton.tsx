import { Button, Icons } from '@/components/elements';
import { useModal } from '@/contexts';

const ModalContent = (): JSX.Element => (
   <div>
      <h1>About</h1>

      <p>Welcome to DataVis: a web-based 3D volumetric data visualization tool.</p>
      <p>
         The <b>front end</b> is created using React and a custom WebGL/GLSL implementation to
         quickly render volumetric data. A serverless &apos;offline&apos; version is in the works.
      </p>
      <p>
         The <b>back end</b> runs on node+Express and will eventually process, store (upon request),
         and then serve user-submitted volumetric data in an easily-renderable data format. A user
         log-in is planned so both saved sessions and stored datasets are accessable from anywhere.
      </p>
   </div>
);

const AboutButton = (): JSX.Element => {
   const { setModalContent } = useModal();

   return (
      <Button
         text={<Icons.QMark size={60} fill="black" />}
         enabled={true}
         active={true}
         onClick={(): void => setModalContent(<ModalContent />)}
      />
   );
};

export default AboutButton;
