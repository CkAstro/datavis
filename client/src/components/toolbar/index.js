import './toolbar.css'; 

const CameraController = () => {
   return (
      <div className='cameraController'>
         <button>Camera Link</button>
         <button>Compare Mode</button>
         <p>Camera Options</p>
      </div>
   );
}

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


const VisItem = () => {
   return (
      <div className='visItem'>
         <img src={require('./deleteButton.png')} className='closeButton'/>
         <select className='varSelect'>
            <option>Density</option>
            <option>Pressure</option>
            <option>Color</option>
         </select>
         <p>0 - Sphere</p>
      </div>
   );
}

const ItemDisplay = () => {
   return (
      <div className='displayContainer'>
      <div className='itemDisplay'>
         <p>Items</p>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
         <VisItem/>
      </div>
      </div>
   );
}



const Toolbar = () => {
   return (
      <div className='toolbarArea'>
         <p>Toolbar</p>
         <div className='optionsArea'>
            <CameraController/>
            <ItemCreator/>
         </div>
         <ItemDisplay/>
      </div>
   );
}

export default Toolbar;