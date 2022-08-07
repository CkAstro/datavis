import { useRenderables } from 'contexts';
import { Icons } from 'components/elements';
import style from './header.module.css';

// close button : clicking will cause the item to delete itself from renderables list
function CloseButton({ controllerId }) {
   const { deleteRenderable } = useRenderables();

   const handleClick = (event) => {
      event.stopPropagation();
      deleteRenderable(controllerId);
   };

   return (
      <div className={style.closeButton} onClick={handleClick}>
         <Icons.Delete
            size={16}
            fill="black"
            setStyle={{ padding: '0px 2px' }}
         />
      </div>
   );
}

export default CloseButton;
