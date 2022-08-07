import style from './dropdown.module.css';

function DropDown({ baseItem, header, children }) {
   return (
      <div className={style.dropdown}>
         {baseItem}
         <div className={style.dropdown__container}>
            <div className={style.dropdown__flex}>
               <div className={style.dropdown__header}>{header}</div>
               {children ? (
                  <div className={style.dropdown__children}>{children}</div>
               ) : null}
            </div>
         </div>
      </div>
   );
}

export default DropDown;
