import ControllerHeader from '../header';
import ControllerContent from '../content';
import style from './controller.module.css';

function Controller({ props }) {
   return (
      <div className={style.itemController}>
         <ControllerHeader controllerId={props.id} />
         <ControllerContent controllerId={props.id} />
      </div>
   );
}

export default Controller;
