import { useState, useContext, createContext } from 'react';
import generateRenderable from './generaterenderable';

const RenderablesContext = createContext();

const RenderablesProvider = ({ children }) => {
   const [ renderables, setRenderables ] = useState([]);

   return (
      <RenderablesContext.Provider value={[renderables, setRenderables]}>
         {children}
      </RenderablesContext.Provider>
   );
}

const useRenderables = () => {
   const [ renderables, setRenderables ] = useContext(RenderablesContext);

   // set renderables from a saved state
   const setAllRenderables = rends => {
      const newRenderables = [ ...rends ];
      setRenderables(newRenderables);
   }

   // add new renderable to list
   // item.isActive is T/F but init with 1 so we can minimize
   //    previous created if it hasn't been minimized already
   const createRenderable = type => {
      const newRenderables = renderables.map(item => {
         if (item.isActive === 1) item.isActive = false;
         return item;
      });
      const renderable = generateRenderable(type, renderables);
      setRenderables(newRenderables.concat(renderable));
   }

   // delete renderable by id
   const deleteRenderable = id => {
      const newRenderables = renderables.filter(item => item.id !== id);
      setRenderables(newRenderables);
   }

   // toggle item viewport visibility
   // id : generated ID for the renderable
   // ind : viewport index to toggle
   const toggleVisible = (id, ind) => {
      const newRenderables = renderables.map(item => {
         if (item.id === id)  item.isVisible[ind] = !item.isVisible[ind];
         return item;
      });
      setRenderables(newRenderables);
   }

   // toggle renderable activation by ID
   // NOTE : previously this would deactivate all other renderables
   //    now it is just a toggle
   const activateRenderable = id => {
      const newRenderables = renderables.map(item => {
         if (item.id === id) item.isActive = !item.isActive;
         return item;
      });
      setRenderables(newRenderables);
   }

   // change display variable, choices currently hard-coded
   const changeActiveVar = (id, newVar) => {
      let newVarIndex;
      if (newVar === 'density') {
         newVarIndex = 0;
      } else if (newVar === 'pressure') {
         newVarIndex = 1;
      } else if (newVar === 'color') {
         newVarIndex = 2;
      } else {
         throw new Error('invalid variable selection');
      }

      const newRenderables = renderables.map(item => {
         if (item.id === id) {
            item.activeVar = newVar;
            item.activeVarIndex = newVarIndex;
         }
         return item;
      });
      setRenderables(newRenderables);
   }

   // change slider value
   // val : actual slide-bar value (e.g. '50' for 0.5)
   // ind : index of slidebar (0-3)
   // id : renderable id
   const changeSlideValue = (val, ind, id) => {
      const newRenderables = renderables.map(item => {
         if (item.id === id) {
            const slider = item.sliderList[ind];
            slider.value = val;
            slider.trueValue = val / 100.0;
         }
         return item;
      });
      setRenderables(newRenderables);
   }

   // change item's displayed name
   const changeItemName = (name, id) => {
      const newRenderables = renderables.map(item => {
         if (item.id === id) item.itemName = name;
         return item;
      });
      setRenderables(newRenderables);
   }

   return {
      renderables,
      setAllRenderables,
      createRenderable,
      deleteRenderable,
      toggleVisible,
      activateRenderable,
      changeActiveVar,
      changeSlideValue,
      changeItemName,
   }
}

export {
   RenderablesProvider,
   useRenderables,
}