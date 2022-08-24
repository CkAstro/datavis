import { Icons } from '@/components/elements';
import css from './Header.module.scss';

type Props = {
   enableEdit: () => void;
};

const EditButton = ({ enableEdit }: Props): JSX.Element => {
   const handleClick = (event: React.MouseEvent): void => {
      event.stopPropagation();
      enableEdit();
   };

   return (
      <button className={css.editButton} onClick={handleClick}>
         <Icons.Edit fill="black" size={12} style={{ padding: '2px' }} />
      </button>
   );
};

export default EditButton;
