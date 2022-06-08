import ItemCreator from './itemcreator';
import ItemDisplay from '../itemdisplay';
import './toolbar.css';

const Toolbar = () => {
   return (
      <div className='toolbarArea'>
         <p><b>Toolbar</b></p>
         <ItemCreator/>
         <ItemDisplay/>
      </div>
   );
}

export default Toolbar;