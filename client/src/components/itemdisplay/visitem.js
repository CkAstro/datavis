import './itemdisplay.css';

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

export default VisItem;