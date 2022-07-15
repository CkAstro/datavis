import { useEffect } from 'react';
import { useRenderables } from 'contexts';
import style from './toolbar.module.css'; 

const ItemCreator = () => {
   const { renderables, createRenderable } = useRenderables();

   useEffect(() => {
      // timeout gives texture time to load
      if (renderables.length === 0) setTimeout(() => createRenderable('sphere'), 1000);
   }, []);

   return (
      <div className={style.optionsArea}>
         <div className={style.itemCreator}>
            <img onClick={() => createRenderable('surface')} title='Isosurface' src={require('assets/img/surface_icon.png')}/>
            <img onClick={() => createRenderable('sphere')} title='Spherical Slice' src={require('assets/img/sphere_icon.png')}/>
            <img onClick={() => createRenderable('zslice')} title='Z-Planar Slice' src={require('assets/img/zyx_z_icon.png')}/>
            <img onClick={() => createRenderable('yslice')} title='Y-Planar Slice' src={require('assets/img/zyx_y_icon.png')}/>
            <img onClick={() => createRenderable('xslice')} title='X-Planar Slice' src={require('assets/img/zyx_x_icon.png')}/>
            <p>Create Items</p>
         </div>
      </div>
   );
}

export default ItemCreator;