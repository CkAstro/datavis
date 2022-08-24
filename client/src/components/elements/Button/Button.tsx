import getButtonStatus from './getButtonStatus';
import css from './Button.module.scss';

type Props = {
   image?: string;
   text?: string | JSX.Element;
   hoverText?: string;
   enabled?: boolean;
   active?: boolean;
   onClick?: () => void;
};

export const Button = ({
   image,
   text,
   hoverText = '',
   enabled = false,
   active = false,
   onClick = () => {},
}: Props): JSX.Element => {
   const buttonImage = image ? (
      <img alt={hoverText} className={css.image} title={hoverText} src={image} />
   ) : null;

   const buttonText = text ? <div className={css.textContainer}>{text}</div> : null;

   const buttonStatus = getButtonStatus(enabled, active);

   return (
      <div className={`noselect ${css.buttonContainer} ${buttonStatus}`} onClick={onClick}>
         {buttonImage}
         {buttonText}
      </div>
   );
};
