import { useRenderables } from '../../../contexts/renderables';
import Icons from '../../icons';
import style from './controllerheader.module.css';

const CloseButton = ({ controllerId }) => {
   const { deleteRenderable } = useRenderables();

   return <div className={style.closeButton} onClick={() => deleteRenderable(controllerId)}>
      <Icons.Delete size={16} fill='black' setStyle={{padding: '0px 2px'}}/>
   </div>;
}

export default CloseButton;