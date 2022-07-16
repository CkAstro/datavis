import style from './button.module.css';

const Button = ({ image, text, hoverText, enabled, active, onClick }) => {
   const buttonImage = image
      ?  <img className={style.image} title={hoverText} src={image} onClick={onClick}/>
      : null
   ;

   const buttonText = text ? <div className={style.textContainer}>{text}</div> : null;
   const buttonStatus = enabled ? (active ? style.active : style.inactive) : style.disabled;

   return (
      <div className={`noselect ${style.buttonContainer} ${buttonStatus}`} onClick={onClick}>
         {buttonImage}
         {buttonText}
      </div>
   );
}

export default Button;