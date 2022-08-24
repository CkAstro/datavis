import { useRenderables } from '@/contexts';
import CloseButton from './CloseButton';
import HeaderInfo from './HeaderInfo';
import VisToggle from './VisToggle';
import css from './Header.module.scss';

type Props = {
   controllerId: number;
};

export const Header = ({ controllerId }: Props): JSX.Element => {
   const { renderables, activateRenderable } = useRenderables();

   const activeController = renderables.find((item) => item.id === controllerId);
   const { isActive } = activeController!;

   const displayToggle = (
      <div className={`noselect ${css.activeToggle} ${isActive !== false ? css.active : ''}`}>
         {isActive !== false ? '-' : '+'}
      </div>
   );

   return (
      <button
         className={css.controllerHeader}
         onClick={(): void => activateRenderable(controllerId)}
      >
         {displayToggle}
         <HeaderInfo
            controllerId={controllerId}
            controller={activeController!}
            isActive={isActive}
         />
         <VisToggle controllerId={controllerId} />
         <CloseButton controllerId={controllerId} />
      </button>
   );
};
