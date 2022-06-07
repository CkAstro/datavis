import ItemCreator from './itemcreator';
import ItemDisplay from '../itemdisplay';
import './toolbar.css';

const Toolbar = () => {
   return (
      <div className='toolbarArea'>
         <p><b>Toolbar</b></p>
         <div className='optionsArea'>
            <ItemCreator/>
         </div>
         <p>Control Items</p>
         <ItemDisplay/>
      </div>
   );
}

export default Toolbar;