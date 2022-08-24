import { Icons } from '@/components/elements';
import { useRenderables } from '@/contexts';
import css from './Header.module.css';

type Props = { controllerId: number };

// close button : clicking will cause the item to delete itself from renderables list
const CloseButton = ({ controllerId }: Props): JSX.Element => {
   const { deleteRenderable } = useRenderables();

   const handleClick = (event: React.MouseEvent): void => {
      event.stopPropagation();
      deleteRenderable(controllerId);
   };

   return (
      <button className={css.closeButton} onClick={handleClick}>
         <Icons.Delete size={16} fill="black" style={{ padding: '0px 2px' }} />
      </button>
   );
};

export default CloseButton;
