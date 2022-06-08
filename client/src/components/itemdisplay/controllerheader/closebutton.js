import { useRenderables } from '../../../contexts/renderables';
import './index.css';

const CloseButton = ({ controllerId }) => {
   const { handleDelete } = useRenderables();

   return (
      <img className='closeButton'
         src={require('./img/trashcan_small.png')}
         onClick={() => handleDelete(controllerId)}
      />
   );
}

export default CloseButton;