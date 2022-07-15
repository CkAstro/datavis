import { useRenderables } from 'contexts';
import { Icons } from 'components/elements';
import style from './header.module.css';

// close button : clicking will cause the item to delete itself from renderables list
const CloseButton = ({ controllerId }) => {
   const { deleteRenderable } = useRenderables();

   return (
      <div className={style.closeButton} onClick={() => deleteRenderable(controllerId)}>
         <Icons.Delete size={16} fill='black' setStyle={{padding: '0px 2px'}}/>
      </div>
   );
}

export default CloseButton;