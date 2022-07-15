import { Icons } from 'components/elements';
import style from './header.module.css';

const EditButton = ({ enableEdit }) => {
   const handleClick = event => {
      event.stopPropagation();
      enableEdit();
   }

   return (
      <div className={style.editButton} onClick={handleClick}>
         <Icons.Edit fill='black' size='12' setStyle={{padding: '2px'}}/>
      </div>
   );
}

export default EditButton;