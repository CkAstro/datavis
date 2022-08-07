import style from './button.module.css';

const getButtonStatus = (enabled, active) => {
   if (!enabled) return style.disabled;
   if (!active) return style.inactive;
   return style.active;
};

function Button({ image, text, hoverText, enabled, active, onClick }) {
   const buttonImage = image ? (
      <img
         alt={hoverText}
         className={style.image}
         title={hoverText}
         src={image}
      />
   ) : null;

   const buttonText = text ? (
      <div className={style.textContainer}>{text}</div>
   ) : null;

   const buttonStatus = getButtonStatus(enabled, active);

   return (
      <div
         className={`noselect ${style.buttonContainer} ${buttonStatus}`}
         onClick={onClick}
      >
         {buttonImage}
         {buttonText}
      </div>
   );
}

export default Button;
