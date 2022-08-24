import NavBar from './Navbar';
import css from './Header.module.scss';

export const Header = () => (
   <div>
      <div className={css.header}>
         <div className="mainContainer">
            <h1>Christopher Kolb</h1>
            <h2>Full Stack Development + Computational Astrophysics</h2>
         </div>
      </div>
      <NavBar />
   </div>
);
