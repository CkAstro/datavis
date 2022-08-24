import css from './DropDown.module.scss';

type Props = {
   baseItem: React.ReactNode;
   header: string;
   children?: React.ReactNode;
};

export const DropDown = ({ baseItem, header, children }: Props) => (
   <div className={css.dropdown}>
      {baseItem}
      <div className={css.dropdown__container}>
         <div className={css.dropdown__flex}>
            <div className={css.dropdown__header}>{header}</div>
            {children ? <div className={css.dropdown__children}>{children}</div> : null}
         </div>
      </div>
   </div>
);
