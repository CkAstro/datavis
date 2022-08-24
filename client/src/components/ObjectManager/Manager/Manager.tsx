import { useRenderables } from '@/contexts';
import type { Renderable } from '@/types';
import { Controller } from '../Controller';
import css from './Manager.module.scss';

export const ObjectManager = (): JSX.Element => {
   const { renderables } = useRenderables();

   const getItemList = renderables.map((item: Renderable) => (
      <Controller key={item.id} props={item} />
   ));

   return (
      <div className={css.displayContainer}>
         <div className={`${css.itemDisplay} noscrollbar`}>{getItemList}</div>
      </div>
   );
};
