import { useEffect } from 'react';
import { useRenderables } from 'contexts';
import { Button } from 'components/elements';
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
            <Button onClick={() => createRenderable('surface')} enabled active title='Isosurface' image={require('assets/img/surface_icon.png')}/>
            <Button onClick={() => createRenderable('sphere')} enabled active title='Spherical Slice' image={require('assets/img/sphere_icon.png')}/>
            <Button onClick={() => createRenderable('zslice')} enabled active title='Z-Planar Slice' image={require('assets/img/zyx_z_icon.png')}/>
            <Button onClick={() => createRenderable('yslice')} enabled active title='Y-Planar Slice' image={require('assets/img/zyx_y_icon.png')}/>
            <Button onClick={() => createRenderable('xslice')} enabled active title='X-Planar Slice' image={require('assets/img/zyx_x_icon.png')}/>
         </div>
         <div className={style.options__miniHeader}>Create Items</div>
      </div>
   );
}

export default ItemCreator;