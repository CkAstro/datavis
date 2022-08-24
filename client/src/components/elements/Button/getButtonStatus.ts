import css from './Button.module.scss';

const getButtonStatus = (enabled: boolean, active: boolean): string => {
   if (!enabled) return css.disabled;
   if (!active) return css.inactive;
   return css.active;
};

export default getButtonStatus;
