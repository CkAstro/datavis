import ControllerHeader from '../controllerheader';
import ControllerContent from '../controllercontent';
import style from './itemcontroller.module.css';

const ItemController = ({ props }) => {

   return (
      <div className={style.itemController}>
         <ControllerHeader controllerId={props.id}/>
         <ControllerContent controllerId={props.id}/>
      </div>
   );
}

export default ItemController;