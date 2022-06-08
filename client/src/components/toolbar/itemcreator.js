import { useRenderables } from '../../contexts/renderables';
import './toolbar.css'; 

const ItemCreator = () => {
   const { handleCreate } = useRenderables();

   return (
      <div className='optionsArea'>
         <div className='itemCreator'>
            <img onClick={() => handleCreate('surface')} title='Isosurface' src={require('./img/surface.png')}/>
            <img onClick={() => handleCreate('sphere')} title='Spherical Slice' src={require('./img/sphere.png')}/>
            <img onClick={() => handleCreate('zslice')} title='Z-Planar Slice' src={require('./img/zyx_z.png')}/>
            <img onClick={() => handleCreate('yslice')} title='Y-Planar Slice' src={require('./img/zyx_y.png')}/>
            <img onClick={() => handleCreate('xslice')} title='X-Planar Slice' src={require('./img/zyx_x.png')}/>
            <p>Create Items</p>
         </div>
      </div>
   );
}

export default ItemCreator;