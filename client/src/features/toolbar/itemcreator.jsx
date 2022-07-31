import { useEffect } from 'react';
import { useRenderables } from 'contexts';
import { Button } from 'components/elements';
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
            <Button onClick={() => createRenderable('mcube')} enabled active title='Isosurface' image={require('assets/img/surface_icon.png')}/>
            <Button onClick={() => createRenderable('sphere')} enabled active title='Spherical Slice' image={require('assets/img/sphere_icon.png')}/>
            <Button onClick={() => createRenderable('zslice')} enabled active title='Z-Planar Slice' image={require('assets/img/zyx_z_icon.png')}/>
            <Button onClick={() => createRenderable('yslice')} enabled active title='Y-Planar Slice' image={require('assets/img/zyx_y_icon.png')}/>
            <Button onClick={() => createRenderable('xslice')} enabled active title='X-Planar Slice' image={require('assets/img/zyx_x_icon.png')}/>
            <p>Create Items</p>
         </div>
      </div>
   );
}

export default ItemCreator;