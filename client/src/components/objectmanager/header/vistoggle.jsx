import { useCamera, useRenderables } from 'contexts';
import style from './header.module.css';

const getButtonStyle = (isEnabled, isVisible) => {
   if (!isEnabled) return style.disabled;
   if (isVisible) return style.active;
   return '';
};

function VisToggle({ controllerId }) {
   const { renderables, toggleVisible } = useRenderables();
   const { options } = useCamera();

   const activeController = renderables.find(
      (item) => item.id === controllerId
   );

   const handleClick = (event, key) => {
      event.stopPropagation();
      if (key !== 0 && !options.compare) return;
      toggleVisible(controllerId, key);
   };

   const buttons = [1, 2].map((val, key) => {
      const isVisible = activeController.isVisible[key];
      const isEnabled = key === 0 ? true : options.compare; // main viewport button always enabled
      const buttonStyle = getButtonStyle(isEnabled, isVisible);
      return (
         <div
            key={val}
            className={`${style.toggleButton} noselect ${buttonStyle}`}
            onClick={(e) => handleClick(e, key)}
         >
            {val}
         </div>
      );
   });

   return <div className={style.visToggle}>{buttons}</div>;
}

export default VisToggle;
