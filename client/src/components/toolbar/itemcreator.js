import './toolbar.css'; 

const ItemCreator = () => {
   return (
      <div className='itemCreator'>
         <button>Create</button>
         <select>
            <option>Slice</option>
            <option>Sphere</option>
            <option>Surface</option>
         </select>
         <p>Create Item</p>
      </div>
   );
}

export default ItemCreator;