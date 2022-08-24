import { useCamera, useRenderables } from '@/contexts';
import css from './Header.module.scss';

const getButtonStyle = (isEnabled: boolean, isVisible: boolean): string => {
   if (!isEnabled) return css.disabled;
   if (isVisible) return css.active;
   return '';
};

type Props = {
   controllerId: number;
};

const VisToggle = ({ controllerId }: Props): JSX.Element => {
   const { renderables, toggleVisible } = useRenderables();
   const { options } = useCamera();

   const activeController = renderables.find((item) => item.id === controllerId);

   const handleClick = (event: React.MouseEvent, key: number): void => {
      event.stopPropagation();
      if (key !== 0 && !options.compare) return;
      toggleVisible(controllerId, key);
   };

   const buttons = [1, 2].map((val, key) => {
      const isVisible = activeController!.isVisible[key];
      const isEnabled = key === 0 ? true : options.compare; // main viewport button always enabled
      const buttonStyle = getButtonStyle(isEnabled, isVisible);
      return (
         <button
            key={val}
            className={`${css.toggleButton} noselect ${buttonStyle}`}
            onClick={(e): void => handleClick(e, key)}
         >
            {val}
         </button>
      );
   });

   return <div className={css.visToggle}>{buttons}</div>;
};

export default VisToggle;
