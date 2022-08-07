import style from './header.module.css';

function NavBar() {
   return (
      <div className={style.navbar}>
         <div className="noselect mainContainer">
            <div className={style.navbar__container}>
               <a className={style.navbar__item} href="https://chriskolb.dev">
                  <div>Home</div>
               </a>
               <div className={`${style.navbar__item} ${style.active}`}>
                  DataVis
               </div>
               <div className={style.navbar__brand}>CHRISTOPHER KOLB</div>
            </div>
         </div>
      </div>
   );
}

export default NavBar;
