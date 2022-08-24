import type { Renderable } from '@/types';
import { Content } from '../Content';
import { Header } from '../Header';
import css from './Controller.module.scss';

type Props = {
   props: Renderable;
};

export const Controller = ({ props }: Props): JSX.Element => (
   <div className={css.itemController}>
      <Header controllerId={props.id} />
      <Content controllerId={props.id} />
   </div>
);
