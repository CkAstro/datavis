import { useEffect } from 'react';
import { useRenderables } from '../../contexts/renderables';
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
            <img onClick={() => createRenderable('surface')} title='Isosurface' src={require('./img/surface.png')}/>
            <img onClick={() => createRenderable('sphere')} title='Spherical Slice' src={require('./img/sphere.png')}/>
            <img onClick={() => createRenderable('zslice')} title='Z-Planar Slice' src={require('./img/zyx_z.png')}/>
            <img onClick={() => createRenderable('yslice')} title='Y-Planar Slice' src={require('./img/zyx_y.png')}/>
            <img onClick={() => createRenderable('xslice')} title='X-Planar Slice' src={require('./img/zyx_x.png')}/>
            <p>Create Items</p>
         </div>
      </div>
   );
}

export default ItemCreator;