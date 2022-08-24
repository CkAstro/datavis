import css from './Header.module.scss';

const NavBar = () => (
   <div className={css.navbar}>
      <div className="noselect mainContainer">
         <div className={css.navbar__container}>
            <a className={css.navbar__item} href="https://chriskolb.dev">
               <div>Home</div>
            </a>
            <div className={`${css.navbar__item} ${css.active}`}>DataVis</div>
            <div className={css.navbar__brand}>CHRISTOPHER KOLB</div>
         </div>
      </div>
   </div>
);

export default NavBar;
