import { useState, useContext, createContext, useMemo } from 'react';
import { generateRenderable } from './generaterenderable';

const RenderablesContext = createContext();

function RenderablesProvider({ children }) {
   const [renderables, setRenderables] = useState([]);
   const collection = useMemo(
      () => ({ renderables, setRenderables }),
      [renderables]
   );

   return (
      <RenderablesContext.Provider value={collection}>
         {children}
      </RenderablesContext.Provider>
   );
}

const useRenderables = () => {
   const collection = useContext(RenderablesContext);
   const { renderables, setRenderables } = collection;

   // set renderables from a saved state
   const setAllRenderables = (rends) => {
      const newRenderables = [...rends];
      setRenderables(newRenderables);
   };

   // add new renderable to list
   // item.isActive is T/F but init with 1 so we can minimize
   //    previous created if it hasn't been minimized already
   const createRenderable = (type) => {
      const newRenderables = renderables.map((item) => {
         if (item.isActive === 1) return { ...item, isActive: false };
         return item;
      });
      const renderable = generateRenderable(type, renderables);
      setRenderables(newRenderables.concat(renderable));
   };

   // delete renderable by id
   const deleteRenderable = (id) => {
      const newRenderables = renderables.filter((item) => item.id !== id);
      setRenderables(newRenderables);
   };

   // toggle item viewport visibility
   // id : generated ID for the renderable
   // ind : viewport index to toggle
   const toggleVisible = (id, ind) => {
      const newRenderables = renderables.map((item) => {
         if (item.id !== id) return item;
         const newItem = { ...item };
         newItem.isVisible[ind] = !newItem.isVisible[ind];
         return newItem;
      });
      setRenderables(newRenderables);
   };

   // toggle renderable activation by ID
   // NOTE : previously this would deactivate all other renderables
   //    now it is just a toggle
   const activateRenderable = (id) => {
      const newRenderables = renderables.map((item) => {
         if (item.id !== id) return item;
         return { ...item, isActive: !item.isActive };
      });
      setRenderables(newRenderables);
   };

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

      const newRenderables = renderables.map((item) => {
         if (item.id !== id) return item;
         const newItem = {
            ...item,
            activeVar: newVar,
            activeVarIndex: newVarIndex,
         };
         return newItem;
      });
      setRenderables(newRenderables);
   };

   // change slider value
   // val : actual slide-bar value (e.g. '50' for 0.5)
   // ind : index of slidebar (0-3)
   // id : renderable id
   const changeSlideValue = (val, ind, id) => {
      const newRenderables = renderables.map((item) => {
         if (item.id !== id) return item;
         const slider = item.sliderList[ind];
         slider.value = val;
         slider.trueValue = val / 100.0;
         return item;
      });
      setRenderables(newRenderables);
   };

   // change item's displayed name
   const changeItemName = (name, id) => {
      const newRenderables = renderables.map((item) => {
         if (item.id !== id) return item;
         const newItem = { ...item, itemName: name };
         return newItem;
      });
      setRenderables(newRenderables);
   };

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
   };
};

export { RenderablesProvider, useRenderables };
