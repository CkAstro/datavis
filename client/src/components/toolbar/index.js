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
         <div className='visHeader'>
            <div className='itemName'>0 - Sphere askdjflasklo</div>
            <div className='toggleArea'>
               <div className='toggleVis active'>1</div>
               <div className='toggleVis disabled'>2</div>
            </div>
            <img className='closeButton' src={require('./trashcan_small.png')}/>
         </div>



         {/* <img src={require('./trashcan_small.png')} className='closeButton'/>
         <div className='toggleArea'>
            <div className='toggleVis disabled'>2</div>
            <div className='toggleVis active'>1</div>
         </div>
         <p>0 - Sphere<img className='editIcon' src={require('./edit.png')}/></p> */}
      </div>
   );
}

const ItemDisplay = () => {
   return (
      <div className='displayContainer'>
      <div className='itemDisplay'>
         <VisItem/>
         <VisItem/>
         {/* <VisItem/>
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
         <VisItem/> */}
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
         <p>Items</p>
         <ItemDisplay/>
      </div>
   );
}

export default Toolbar;