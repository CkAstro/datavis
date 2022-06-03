import ControllerHeader from './controllerheader';
import ControllerContent from './controllercontent';
import './itemcontroller.css';

const ItemController = ({ props }) => {

   return (
      <div className='itemController'>
         <ControllerHeader controllerId={props.id}/>
         <ControllerContent controllerId={props.id}/>
      </div>
   );
}

export default ItemController;