import { useEffect } from 'react';
import { useRenderables } from 'contexts';
import IsosurfaceButtons from './isosurfacebuttons';
import SphereButton from './spherebutton';
import ZPlaneButton from './zplanebutton';
import YPlaneButton from './yplanebutton';
import XPlaneButton from './xplanebutton';
import style from './toolbar.module.css'; 

const ItemCreator = () => {
   const { createRenderable } = useRenderables();

   // create sphere on initial load
   useEffect(() => {
      createRenderable('sphere');
   }, []);

   return (
      <div className={style.options}>
         <div className={style.options__itemCreator}>
            <IsosurfaceButtons/>
            <SphereButton/>
            <ZPlaneButton/>
            <YPlaneButton/>
            <XPlaneButton/>
         </div>
         <div className={style.options__miniHeader}>Create Items</div>
      </div>
   );
}

export default ItemCreator;