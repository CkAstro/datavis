import { useState } from 'react';
import { useRenderables } from '../../contexts/renderables';
import './toolbar.css'; 

const ItemCreator = () => {
   const [ selection, setSelection ] = useState('sphere');

   const handleSelection = event => {
      event.preventDefault();
      setSelection(event.target.value);
   }

   const { handleCreate } = useRenderables();

   return (
      <div className='itemCreator'>
         <button onClick={() => handleCreate(selection)}>Create</button>
         <select onChange={e => handleSelection(e)} defaultValue='sphere'>
            <option value='xslice'>X Slice</option>
            <option value='yslice'>Y Slice</option>
            <option value='zslice'>Z Slice</option>
            <option value='sphere'>Sphere</option>
            <option value='surface'>Surface</option>
         </select>
         <p>Create Item</p>
      </div>
   );
}

export default ItemCreator;