import ControllerHeader from '../header';
import ControllerContent from '../content';
import style from './controller.module.css';

const Controller = ({ props }) => (
   <div className={style.itemController}>
      <ControllerHeader controllerId={props.id}/>
      <ControllerContent controllerId={props.id}/>
   </div>
);

export default Controller;